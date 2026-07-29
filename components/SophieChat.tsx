'use client';

import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SophieChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Stable id for this visitor's conversation, so the server can assemble
  // the transcript for the end-of-chat report.
  const sessionIdRef = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `s-${Math.random().toString(36).slice(2)}`
  );
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const fullHistory = [...messages, userMessage];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fullHistory, session_id: sessionIdRef.current }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I had trouble processing that. Could you try again?'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Widget Styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(140, 198, 63, 0.2);
          }
          50% {
            transform: scale(1.03);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(140, 198, 63, 0.4);
          }
        }
      `}</style>

      {/* Widget Container */}
      <div style={{
        position: 'fixed',
        bottom: isMobile ? '20px' : '30px',
        right: isMobile ? '20px' : '30px',
        zIndex: 10000,
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}>

        {/* Speech Bubble - Always visible when chat closed */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) translateX(-4px) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(140, 198, 63, 0.4), 0 0 80px rgba(140, 198, 63, 0.3), 0 0 40px rgba(140, 198, 63, 0.5), 0 12px 32px rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(140, 198, 63, 0.8)';
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 30, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) translateX(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(140, 198, 63, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(140, 198, 63, 0.2)';
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
            }}
            style={{
              position: 'absolute',
              bottom: isMobile ? '8px' : '10px',
              right: isMobile ? '80px' : '90px',
              background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.9))',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              color: 'rgba(255, 255, 255, 0.9)',
              padding: isMobile ? '7px 10px' : '8px 12px',
              borderRadius: '10px',
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 500,
              fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              whiteSpace: 'nowrap',
              lineHeight: '1.3',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(140, 198, 63, 0.2)',
              border: '1px solid rgba(140, 198, 63, 0.2)',
              zIndex: 10001,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              animation: 'gentlePulse 3s ease-in-out infinite'
            }}>
            Talk to Sophie<br />about your project
            {/* Speech bubble arrow pointing right to button - larger and clearer */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '-10px',
              transform: 'translateY(-50%)',
              width: '0',
              height: '0',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '10px solid rgba(20, 20, 20, 0.9)'
            }} />
            {/* Arrow border for better visibility */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '-11px',
              transform: 'translateY(-50%)',
              width: '0',
              height: '0',
              borderTop: '11px solid transparent',
              borderBottom: '11px solid transparent',
              borderLeft: '11px solid rgba(140, 198, 63, 0.2)'
            }} />
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: isMobile ? '60px' : '70px',
            height: isMobile ? '60px' : '70px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.9))',
            border: '1px solid rgba(140, 198, 63, 0.2)',
            cursor: 'pointer',
            boxShadow: '0 24px 48px rgba(140, 198, 63, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)',
            backdropFilter: isMobile ? 'blur(15px)' : 'blur(30px)',
            WebkitBackdropFilter: isMobile ? 'blur(15px)' : 'blur(30px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={!isMobile ? (e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 32px 64px rgba(140, 198, 63, 0.3)';
          } : undefined}
          onMouseLeave={!isMobile ? (e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(140, 198, 63, 0.2)';
          } : undefined}
          aria-label="Open chat"
        >
          <img
            src="/images/greenstar-logo-dots.png"
            alt="Greenstar Solar"
            style={{
              width: isMobile ? '36px' : '42px',
              height: isMobile ? '36px' : '42px',
              borderRadius: '8px',
              filter: 'drop-shadow(0 0 12px rgba(140, 198, 63, 0.4)) brightness(1.1)'
            }}
          />
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div style={{
            position: isMobile ? 'fixed' : 'absolute',
            top: isMobile ? '4vh' : 'auto',
            bottom: isMobile ? 'auto' : '85px',
            right: isMobile ? '10px' : 0,
            left: isMobile ? '10px' : 'auto',
            width: isMobile ? 'calc(100% - 20px)' : '420px',
            height: isMobile ? '92vh' : '600px',
            maxHeight: isMobile ? '92vh' : '600px',
            background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.98), rgba(15, 15, 15, 0.95))',
            borderRadius: isMobile ? '20px' : '24px',
            border: '1px solid rgba(140, 198, 63, 0.2)',
            backdropFilter: isMobile ? 'blur(20px)' : 'blur(50px)',
            WebkitBackdropFilter: isMobile ? 'blur(20px)' : 'blur(50px)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.4s ease-out'
          }}>

            {/* Header */}
            <div style={{
              padding: isMobile ? '16px 20px' : '20px 24px',
              paddingTop: isMobile ? 'max(16px, env(safe-area-inset-top))' : '20px',
              background: 'linear-gradient(135deg, #8cc63f, #7ab52f)',
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                  Chat with Sophie
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
                  Greenstar Solar Assistant
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: isMobile ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.15)',
                  border: isMobile ? '2px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(0, 0, 0, 0.2)',
                  fontSize: isMobile ? '28px' : '18px',
                  cursor: 'pointer',
                  padding: isMobile ? '4px' : '6px 10px',
                  borderRadius: isMobile ? '12px' : '10px',
                  color: '#000',
                  transition: 'all 0.2s',
                  minWidth: isMobile ? '48px' : 'auto',
                  minHeight: isMobile ? '48px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: isMobile ? 300 : 400,
                  lineHeight: 1
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: isMobile ? '16px' : '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '16px',
              WebkitOverflowScrolling: 'touch'
            }}>
              {messages.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '40px'
                }}>
                  <div style={{ fontSize: '14px', marginBottom: '12px' }}>
                    Hi! I'm Sophie from Greenstar Solar.
                  </div>
                  <div style={{ fontSize: '12px' }}>
                    How can I help you today?
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: isMobile ? '85%' : '75%',
                    padding: isMobile ? '10px 14px' : '12px 16px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #8cc63f, #7ab52f)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: msg.role === 'user' ? '#000' : '#fff',
                    fontSize: isMobile ? '15px' : '14px',
                    lineHeight: '1.5',
                    wordWrap: 'break-word'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '6px', padding: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8cc63f',
                    animation: 'pulse 1.4s ease-in-out infinite'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8cc63f',
                    animation: 'pulse 1.4s ease-in-out 0.2s infinite'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8cc63f',
                    animation: 'pulse 1.4s ease-in-out 0.4s infinite'
                  }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{
              padding: isMobile ? '16px' : '20px',
              paddingBottom: isMobile ? 'max(16px, env(safe-area-inset-bottom))' : '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: isMobile ? '14px 16px' : '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(140, 198, 63, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: isMobile ? '16px' : '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    minHeight: isMobile ? '48px' : 'auto'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8cc63f';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(140, 198, 63, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  style={{
                    padding: isMobile ? '14px 28px' : '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: inputValue.trim() && !isLoading
                      ? 'linear-gradient(135deg, #8cc63f, #7ab52f)'
                      : 'rgba(140, 198, 63, 0.3)',
                    color: inputValue.trim() && !isLoading ? '#000' : 'rgba(255, 255, 255, 0.5)',
                    fontSize: isMobile ? '15px' : '14px',
                    fontWeight: 600,
                    cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    minHeight: isMobile ? '48px' : 'auto',
                    minWidth: isMobile ? '80px' : 'auto'
                  }}
                >
                  Send
                </button>
              </div>
            </form>

          </div>
        )}
      </div>
    </>
  );
}
