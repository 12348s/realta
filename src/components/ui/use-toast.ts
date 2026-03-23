import { useState, useEffect } from 'react';

export type ToastProps = { description: string };
let memory: ToastProps[] = [];
const subscribers = new Set<() => void>();

export function toast(props: ToastProps) {
  memory = [...memory, props];
  subscribers.forEach(cb => cb());
  setTimeout(() => {
    memory = memory.slice(1);
    subscribers.forEach(cb => cb());
  }, 3000);
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  useEffect(() => {
    const cb = () => setToasts(memory);
    cb();
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
  }, []);
  return { toasts };
}
