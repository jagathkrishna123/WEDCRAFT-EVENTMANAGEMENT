


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSend, IoPaperPlane } from 'react-icons/io5';
import { HiOutlineMail, HiOutlineUsers } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';

const AdminNotification = () => {
    const [messages, setMessages] = useState([]);
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState('all');
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/notifications', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data?.data || []);
        } catch (err) {
            console.error('Failed to fetch admin messages', err);
        }
    };

    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/viewProvidres', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProviders(res.data?.data || []);
        } catch (err) {
            console.error('Failed to fetch providers', err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/send-notification',
                { receiverId: selectedProvider, message: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error('Failed to send notification', err);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchProviders();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto no-scrollbar">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border border-cyan-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <BiMessageDetail className="text-2xl text-cyan-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Admin Messaging Center
                        </h2>
                        <p className="text-sm text-gray-600 mt-0.5">
                            Send notifications and view message history
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Messages</p>
                            <p className="text-2xl font-bold text-gray-800">{messages.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <HiOutlineMail className="text-xl text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Providers</p>
                            <p className="text-2xl font-bold text-gray-800">{providers.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                            <HiOutlineUsers className="text-xl text-cyan-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Send Message Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-fit">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <IoPaperPlane className="text-xl" />
                            Send New Message
                        </h3>
                    </div>

                    <form onSubmit={sendMessage} className="p-6 space-y-5">
                        {/* Recipient Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Recipient
                            </label>
                            <div className="relative">
                                <HiOutlineUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <select
                                    value={selectedProvider}
                                    onChange={(e) => setSelectedProvider(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="all">All Providers</option>
                                    {providers.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message here..."
                                required
                                rows="5"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <IoSend className="text-lg" />
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Message History Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <FiClock className="text-xl" />
                            Message History
                        </h3>
                    </div>

                    <div className="p-6 max-h-[600px] overflow-y-auto space-y-3 no-scrollbar">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BiMessageDetail className="text-3xl text-gray-400" />
                                </div>
                                <p className="text-gray-600 font-medium mb-1">No messages yet</p>
                                <p className="text-sm text-gray-500">
                                    Send your first message to providers
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all duration-200"
                                >
                                    {/* Message Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${msg.senderModel === 'Admin'
                                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                                                }`}>
                                                {msg.senderModel === 'Admin' ? 'A' : 'P'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {msg.senderModel === 'Admin' ? 'You' : msg.senderName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    to {msg.receiverId === 'all' ? 'All Providers' : (msg.receiverId === 'admin' ? 'Admin' : 'Provider')}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                                            <FiClock className="text-xs" />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Message Content */}
                                    <p className="text-sm text-gray-700 leading-relaxed mb-2 pl-10">
                                        {msg.message}
                                    </p>

                                    {/* Timestamp */}
                                    <p className="text-xs text-gray-500 pl-10">
                                        {new Date(msg.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNotification;