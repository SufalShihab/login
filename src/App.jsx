import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import image from './assets/CamScanner 01-30-2024 19.18.jpg';



export default function App() {
  const [name, setName] = useState('');
  const [loveAnswer, setLoveAnswer] = useState(null); 
  const [dateAnswer, setDateAnswer] = useState(null); 
  
  // 'No' বাটনগুলোর পলায়ন স্টেট
  const [loveNoStyle, setLoveNoStyle] = useState({});
  const [dateNoStyle, setDateNoStyle] = useState({});

  // তারিখ ও সময় স্টেট
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('06:00 PM (Dinner)');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '11:00 AM (Morning Coffee ☕)',
    '02:00 PM (Lunch Date 🍝)',
    '05:00 PM (Sunset Walk 🌅)',
    '07:00 PM (Candlelight Dinner 🕯️)'
  ];

  // Love Section - 'No' বাটন সরানোর ফাংশন
  const moveLoveNoButton = () => {
    if (loveAnswer === 'Yes') return; // হ্যাঁ সিলেক্ট থাকলে আর পালাবে না
    const x = Math.floor(Math.random() * 150) - 75;
    const y = Math.floor(Math.random() * 100) - 50;
    setLoveNoStyle({ transform: `translate(${x}px, ${y}px)`, transition: 'all 0.2s ease' });
  };

  // Date Section - 'No' বাটন সরানোর ফাংশন
  const moveDateNoButton = () => {
    if (dateAnswer === 'Yes') return; // হ্যাঁ সিলেক্ট থাকলে আর পালাবে না
    const x = Math.floor(Math.random() * 150) - 75;
    const y = Math.floor(Math.random() * 100) - 50;
    setDateNoStyle({ transform: `translate(${x}px, ${y}px)`, transition: 'all 0.2s ease' });
  };

  // ইমেইল সাবমিশন
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter your name!');
      return;
    }
    if (!loveAnswer) {
      alert('Please answer the first question!');
      return;
    }
    if (!dateAnswer) {
      alert('Please answer the second question!');
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: name,
      love_answer: loveAnswer,
      date_answer: dateAnswer,
      date_time: dateAnswer === 'Yes' ? `${selectedDate} | Time Slot: ${selectedTimeSlot}` : 'Declined',
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, (err) => {
        setLoading(false);
        alert('Failed to send response. Please try again.');
        console.error('FAILED...', err);
      });
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '30px auto',
      padding: '25px 20px',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      borderRadius: '20px',
      border: '1px solid #f0f0f0'
    }}>
      
      {/* Profile Image */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <img 
          src={image}
          alt="Profile" 
          style={{ 
            width: '95px', 
            height: '95px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            border: '3px solid #ff4d6d',
            boxShadow: '0 4px 12px rgba(255, 77, 109, 0.25)'
          }} 
        />
      </div> */}

      {/* Title */}
      <h2 style={{ color: '#ff4d6d', fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0' }}>
        Hey Beautiful ✨
      </h2>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px', fontWeight: '500' }}>
        I have a special question for you 💖
      </p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#4a4a4a' }}>
              Your Name:
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name here..." 
              required
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                fontSize: '13px', 
                borderRadius: '8px', 
                border: '1.5px solid #e0e0e0',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          {/* Question 1: Do you love me? */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <p style={{ fontWeight: '600', fontSize: '14px', color: '#333', marginBottom: '10px' }}>
              1. Do you love me?
            </p>
            <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
              <button 
                type="button"
                onClick={() => setLoveAnswer(loveAnswer === 'Yes' ? null : 'Yes')} 
                style={{ 
                  flex: 1,
                  padding: '8px 14px', 
                  backgroundColor: loveAnswer === 'Yes' ? '#ff4d6d' : '#f8f9fa', 
                  color: loveAnswer === 'Yes' ? '#fff' : '#333', 
                  border: loveAnswer === 'Yes' ? 'none' : '1.5px solid #e0e0e0', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: loveAnswer === 'Yes' ? '0 3px 10px rgba(255,77,109,0.3)' : 'none'
                }}
              >
                Yes ❤️
              </button>

              <button 
                type="button"
                onMouseEnter={moveLoveNoButton}
                onClick={moveLoveNoButton}
                style={{ 
                  flex: 1,
                  padding: '8px 14px', 
                  backgroundColor: '#6c757d', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  // 'Yes' ক্লিক করা হলে না বাটনটি নিজের মূল অবস্থানে ফিরে আসবে
                  transform: loveAnswer === 'Yes' ? 'translate(0, 0)' : loveNoStyle.transform,
                  transition: 'all 0.2s ease'
                }}
              >
                No 💔
              </button>
            </div>
          </div>

          {/* Question 2: Will you go on a date with me? */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <p style={{ fontWeight: '600', fontSize: '14px', color: '#333', marginBottom: '10px' }}>
              2. Will you go on a date with me?
            </p>
            <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
              <button 
                type="button"
                onClick={() => setDateAnswer(dateAnswer === 'Yes' ? null : 'Yes')} 
                style={{ 
                  flex: 1,
                  padding: '8px 14px', 
                  backgroundColor: dateAnswer === 'Yes' ? '#ff4d6d' : '#f8f9fa', 
                  color: dateAnswer === 'Yes' ? '#fff' : '#333', 
                  border: dateAnswer === 'Yes' ? 'none' : '1.5px solid #e0e0e0', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: dateAnswer === 'Yes' ? '0 3px 10px rgba(255,77,109,0.3)' : 'none'
                }}
              >
                Yes 🌹
              </button>

              <button 
                type="button"
                onMouseEnter={moveDateNoButton}
                onClick={moveDateNoButton}
                style={{ 
                  flex: 1,
                  padding: '8px 14px', 
                  backgroundColor: '#6c757d', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  // 'Yes' ক্লিক করা হলে না বাটনটি নিজের মূল অবস্থানে ফিরে আসবে
                  transform: dateAnswer === 'Yes' ? 'translate(0, 0)' : dateNoStyle.transform,
                  transition: 'all 0.2s ease'
                }}
              >
                No 🙈
              </button>
            </div>
          </div>

          {/* Date & Time Slot Picker */}
          {dateAnswer === 'Yes' && (
            <div style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              backgroundColor: '#fff5f7', 
              borderRadius: '12px', 
              textAlign: 'left', 
              border: '1px solid #ffe0e6'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#ff4d6d', fontSize: '14px' }}>
                📅 Schedule Our Date
              </h4>
              
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', color: '#555', marginBottom: '5px' }}>
                  Select Date:
                </label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid #ffccd5', 
                    boxSizing: 'border-box',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', color: '#555', marginBottom: '6px' }}>
                  Select Time Slot:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                  {timeSlots.map((slot, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedTimeSlot(slot)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        border: selectedTimeSlot === slot ? '1.5px solid #ff4d6d' : '1px solid #e0e0e0',
                        backgroundColor: selectedTimeSlot === slot ? '#ffffff' : '#fafafa',
                        color: selectedTimeSlot === slot ? '#ff4d6d' : '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyButton: 'space-between'
                      }}
                    >
                      <span>{slot}</span>
                      {selectedTimeSlot === slot && <span>✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#ff4d6d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              fontSize: '15px',
              fontWeight: '700',
              boxShadow: '0 4px 15px rgba(255, 77, 109, 0.3)'
            }}
          >
            {loading ? 'Sending...' : 'Send Answer 💌'}
          </button>

        </form>
      ) : (
        <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '12px', color: '#2e7d32' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Thank You, {name}! 🎉</h3>
          <p style={{ fontSize: '13px', margin: '0', lineHeight: '1.4' }}>
            Your response has been sent successfully! Can't wait for our date! 💕
          </p>
        </div>
      )}

    </div>
  );
}