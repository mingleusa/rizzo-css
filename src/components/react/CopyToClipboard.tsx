import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';

export interface CopyToClipboardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  value: string;
  label?: string;
  format?: string;
  iconOnly?: boolean;
  buttonLabel?: string;
  className?: string;
  id?: string;
}

export function CopyToClipboard({
  value,
  label,
  format,
  iconOnly = false,
  buttonLabel,
  className = '',
  id: idProp,
  onClick,
  onKeyDown,
  ...rest
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const buttonId = idProp ?? `copy-btn-${Math.random().toString(36).slice(2, 11)}`;
  const displayText = iconOnly ? (buttonLabel ?? 'Copy') : value;
  const classes = [
    'copy-to-clipboard',
    iconOnly ? 'copy-to-clipboard--icon-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
  const ariaLabel = copied
    ? format ? `Copied ${format}!` : 'Copied!'
    : label ?? (iconOnly ? (buttonLabel ?? 'Copy to clipboard') : `Copy ${value} to clipboard`);
  const tooltipText = copied
    ? format ? `Copied ${format}!` : 'Copied!'
    : label ?? (iconOnly ? (buttonLabel ?? 'Copy') : 'Copy to clipboard');

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setFeedbackText(format ? `Copied ${format}!` : 'Copied!');
      setTimeout(() => {
        setCopied(false);
        setFeedbackText('');
      }, 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setFeedbackText(format ? `Copied ${format}!` : 'Copied!');
        setTimeout(() => {
          setCopied(false);
          setFeedbackText('');
        }, 2000);
      } catch {
        setFeedbackText('Failed to copy');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    copy();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copy();
    }
  };

  return (
    <span className="tooltip-host" data-tooltip={tooltipText}>
      <button
        type="button"
        className={classes}
        aria-label={ariaLabel}
        id={buttonId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span className="copy-to-clipboard__text">{displayText}</span>
        <span
          className={`copy-to-clipboard__icon copy-to-clipboard__icon--copy ${copied ? 'copy-to-clipboard__icon--hidden' : ''}`.trim()}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </span>
        <span
          className={`copy-to-clipboard__icon copy-to-clipboard__icon--check ${!copied ? 'copy-to-clipboard__icon--hidden' : ''}`.trim()}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="copy-to-clipboard__feedback" aria-live="polite">
          {feedbackText}
        </span>
      </button>
    </span>
  );
}

export default CopyToClipboard;
