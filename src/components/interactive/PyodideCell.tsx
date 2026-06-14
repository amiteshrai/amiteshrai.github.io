import { useEffect, useRef, useState } from 'react';

// Tier 4 - runnable Python. Pyodide (~10MB WASM) is loaded LAZILY from the public
// jsDelivr CDN, never bundled. A module-level promise guards against double-loading
// when multiple cells exist on one page.

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL: string }) => Promise<PyodideRuntime>;
  }
}

interface PyodideRuntime {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
}

const PYODIDE_VERSION = 'v0.27.2';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<PyodideRuntime> | null = null;

function loadPyodideOnce(): Promise<PyodideRuntime> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide from CDN'));
        document.head.appendChild(script);
      });
    }
    return window.loadPyodide!({ indexURL: PYODIDE_CDN });
  })();
  return pyodidePromise;
}

type Status = 'loading' | 'ready' | 'running' | 'error';

export default function PyodideCell({ initialCode = 'print("hello")' }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<Status>('loading');
  const py = useRef<PyodideRuntime | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadPyodideOnce()
      .then((runtime) => {
        if (cancelled) return;
        py.current = runtime;
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        setOutput(String(err));
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const run = async () => {
    if (!py.current) return;
    setStatus('running');
    let captured = '';
    const append = (s: string) => {
      captured += s + '\n';
      setOutput(captured);
    };
    try {
      setOutput('');
      py.current.setStdout({ batched: append });
      py.current.setStderr({ batched: append });
      const result = await py.current.runPythonAsync(code);
      if (result !== undefined) append(String(result));
    } catch (err) {
      append(String(err));
    } finally {
      setStatus('ready');
    }
  };

  const busy = status === 'loading' || status === 'running';

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.max(3, code.split('\n').length)}
        className="block w-full resize-y bg-[#1c1917] p-4 font-mono text-sm text-[#f5f1ea] focus:outline-none"
      />
      <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-2">
        <button
          onClick={run}
          disabled={busy}
          className="rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-fg disabled:opacity-50"
        >
          {status === 'running' ? 'Running...' : 'Run'}
        </button>
        <span className="font-mono text-xs text-muted">
          {status === 'loading' && 'Loading Python runtime...'}
          {status === 'ready' && 'Python ready'}
          {status === 'error' && 'Failed to load runtime'}
        </span>
      </div>
      {output && (
        <pre className="m-0 max-h-64 overflow-auto border-t border-border bg-bg p-4 font-mono text-sm text-fg">
          {output}
        </pre>
      )}
    </div>
  );
}
