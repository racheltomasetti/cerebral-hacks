'use client'

import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotMessages() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: 'bot', timestamp: new Date() },
    { id: 2, text: "I have a question about my cycle.", sender: 'user', timestamp: new Date() },
    { id: 3, text: "Sure, I'd be happy to help. What would you like to know about your cycle?", sender: 'bot', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [query, setQuery] = useState("")
  const [res, setRes] = useState([])
  function handleChange(event) {
    setQuery(event.target.value)
  }
  let ai_res = '';
  const queryFetch = () => {
    console.log("Inside the queryfetch");
    fetch('http://127.0.0.1:5000/api/gpt4?q=' + query)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // setRes(JSON.parse(data)["choices"][0]["message"]["content"]);
            console.log(JSON.parse(data)["choices"][0]["message"]["content"])
            ai_res = JSON.parse(data)["choices"][0]["message"]["content"];
            console.log(res);
        })
    
  }
  const handleSendMessage = () => {
      queryFetch();
      const userMessage: Message = {
        id: messages.length + 1,
        text: query,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: ai_res,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 5000);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage  />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t fixed bottom-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            onChange={handleChange}
            className="flex-grow"
          />
          <Button type="submit"  size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}