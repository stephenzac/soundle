import { useEffect, useEffectEvent, useState } from 'react';
import { cn } from '../../lib/cn';

const EXIT_ANIMATION_MS = 100;

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button
    className="flex items-center justify-center hover:cursor-pointer font-bold self-end size-11 shrink-0 pixel-border hover:bg-red-600 transition-all"
    onClick={onClose}
    aria-label="Close"
    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
  >
    X
  </button>
);

interface PixelModalProps {
  // Called once the exit animation has finished
  onClose: () => void;
  // id of the element inside children that describes the dialog
  descriptionId: string;
  // A function child gets a close() that plays the exit animation before calling onClose
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
}

export const PixelModal: React.FC<PixelModalProps> = ({ onClose, descriptionId, children }) => {
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit'>('enter');

  const handleClose = () => {
    setPhase('exit');
    setTimeout(onClose, EXIT_ANIMATION_MS);
  };

  // Wait a frame so the 'enter' styles paint before transitioning to 'active'
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPhase('active'));
    return () => cancelAnimationFrame(frame);
  }, []);

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') handleClose();
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div
        className={cn(
          'flex justify-center h-screen w-screen fixed top-0 bottom-0 left-0 right-0 z-10 pixel-modal-background',
          phase === 'enter' && 'background-animate-in',
          phase === 'active' && 'background-active',
          phase === 'exit' && 'background-animate-out'
        )}
        onClick={handleClose}
        role="presentation"
      />

      <section
        className={cn(
          'flex flex-col px-4 fixed inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] overflow-y-auto pixel-modal w-[calc(100%-2rem)] max-w-md lg:max-w-xl pt-4 pb-4 z-10',
          phase === 'enter' && 'modal-animate-in',
          phase === 'active' && 'modal-active',
          phase === 'exit' && 'modal-animate-out'
        )}
        role="dialog"
        aria-describedby={descriptionId}
        aria-modal="true"
      >
        <CloseButton onClose={handleClose} />
        {typeof children === 'function' ? children(handleClose) : children}
      </section>
    </>
  );
};
