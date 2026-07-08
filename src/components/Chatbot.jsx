import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { dbService } from '../dbService';
import './Chatbot.css';

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am the RK Cargo Assistant. 🚚 Need help tracking a package, checking relocation costs, or contacting the Vadodara branch?',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSuggest = (text) => {
    handleSendMessage(null, text);
  };

  const processBotResponse = async (userText) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const text = userText.toLowerCase().trim();
    let reply = "";
    
    // 1. Lorry Receipt tracking lookup (supports e.g., RK-VDRA-101)
    const lrMatch = userText.toUpperCase().match(/RK-VDRA-\d+/);
    
    if (lrMatch) {
      const lrNumber = lrMatch[0];
      try {
        const shipment = await dbService.getShipmentByLR(lrNumber);
        if (shipment) {
          reply = `🔍 Shipment Found! \nLR Number: ${shipment.lr_number}\nClient: ${shipment.customer_name}\nStatus: ${shipment.current_status.replace('_', ' ').toUpperCase()}\nCurrent Location: ${shipment.current_location}\nETA: ${new Date(shipment.eta).toLocaleDateString('en-IN')}.\n\nWould you like me to redirect you to the full tracking page?`;
        } else {
          reply = `❌ Sorry, I couldn't find any shipment matching "${lrNumber}". Please make sure the Lorry Receipt number is correct. (Try "RK-VDRA-101" for a demo!)`;
        }
      } catch (err) {
        reply = `⚠️ I encountered an error checking tracking number "${lrNumber}". Please try again shortly.`;
      }
    }
    // 2. Pricing and calculator
    else if (text.includes('price') || text.includes('cost') || text.includes('charge') || text.includes('rate') || text.includes('calculator')) {
      reply = "📊 Relocation costs depend on the volume of goods, packing quality, and distance. We recommend using our interactive Cost Calculator! It gives instant estimates and saves your request. Would you like to go to the Calculator page?";
    }
    // 3. IBA Approved
    else if (text.includes('iba') || text.includes('approved') || text.includes('certified') || text.includes('bank')) {
      reply = "✅ Yes! RK Cargo Packers and Movers is an IBA (Indian Banks Association) approved service provider. Our operations, transport containers, and drivers conform to official logistics security guidelines. We support corporate and bank employee relocations.";
    }
    // 4. Vadodara Location / Address
    else if (text.includes('address') || text.includes('office') || text.includes('location') || text.includes('where') || text.includes('gotri') || text.includes('vadodara')) {
      reply = "📍 Our Vadodara Branch is located at:\nShop 4, Ground Floor, Royal Plaza, Near Gotri Lake, Gotri, Vadodara, Gujarat - 390021.\n\nYou can also find a map and contact details on our Contact page!";
    }
    // 5. Contact / phone call
    else if (text.includes('call') || text.includes('phone') || text.includes('number') || text.includes('contact') || text.includes('mobile')) {
      reply = "📞 You can contact our Gotri, Vadodara branch managers directly at +91 98765 43210 or +91 99988 77766. We are open from Mon-Sat (9:00 AM to 8:00 PM).";
    }
    // 6. Redirect triggers
    else if (text === 'redirect_calculator') {
      navigate('/calculator');
      reply = "Routing you to the Cost Calculator page now! Let me know if you need anything else.";
    } else if (text === 'redirect_track') {
      navigate('/track');
      reply = "Routing you to the Tracking page! Please input your LR number there.";
    }
    // 7. General salutations
    else if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('greetings')) {
      reply = "Hello! 👋 How can I help you with your packers and movers needs today?";
    } else if (text.includes('thank') || text.includes('thanks') || text.includes('cool') || text.includes('ok')) {
      reply = "You are most welcome! Let me know if you have any other questions. Safe shifting! 🚚";
    }
    // 8. Default fallback
    else {
      reply = "I understand you have questions about shifting. You can ask me:\n• 'Are you IBA approved?'\n• 'Where is your Vadodara office?'\n• 'How do I track parcel RK-VDRA-101?'\n• Or type 'Cost' to estimate shifting expenses!";
    }

    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsTyping(false);
  };

  const handleSendMessage = (e, customText = '') => {
    if (e) e.preventDefault();
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Process Bot Response
    processBotResponse(textToSend);
  };

  const suggestions = [
    { label: 'Track RK-VDRA-101 🔍', action: 'Track parcel RK-VDRA-101' },
    { label: 'Are you IBA Approved? ✅', action: 'Are you IBA approved?' },
    { label: 'Shifting Calculator 📊', action: 'redirect_calculator' },
    { label: 'Vadodara Office Address 📍', action: 'Where is your Vadodara office?' }
  ];

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Bubble */}
      <button className="chat-bubble-toggle pulse-glow" onClick={toggleChat} aria-label="Toggle chat assistant">
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chat-window card glass animate-slide-in">
          <div className="chat-header-bar">
            <div className="chat-bot-identity">
              <div className="bot-icon-circle">
                <Bot size={20} />
              </div>
              <div>
                <h4>RK Cargo Assistant</h4>
                <div className="bot-status-row">
                  <span className="bot-status-dot"></span>
                  <span>Active Assistant</span>
                </div>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message-row ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
                <div className="message-icon">
                  {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  </div>
                  <span className="message-timestamp">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row msg-bot">
                <div className="message-icon">
                  <Bot size={12} />
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble typing-bubble">
                    <Loader size={16} className="animate-spin" />
                    <span>typing response...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chat-suggestions-container">
            {suggestions.map((sug, idx) => (
              <button 
                key={idx} 
                className="chat-sug-chip" 
                onClick={() => handleSuggest(sug.action)}
              >
                {sug.label}
              </button>
            ))}
          </div>

          {/* Chat Form Input */}
          <form onSubmit={(e) => handleSendMessage(e)} className="chat-input-form">
            <input 
              type="text" 
              placeholder="Ask anything or enter tracking number..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="chat-input-text"
              required
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
