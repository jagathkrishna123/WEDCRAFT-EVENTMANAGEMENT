// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProviderNotification = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     const fetchMessages = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.get('/messages', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(res.data?.data || []);
//         } catch (err) {
//             console.error('Failed to fetch provider messages', err);
//         }
//     };

//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(
//                 '/message/send',
//                 { message: newMessage },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setNewMessage('');
//             fetchMessages();
//         } catch (err) {
//             console.error('Failed to send message to admin', err);
//         }
//     };

//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     return (
//         <div>
//             <h2>Provider Messaging Center</h2>
//             <form onSubmit={sendMessage}>
//                 <textarea
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Message to admin..."
//                     required
//                 />
//                 <br />
//                 <button type="submit">Send to Admin</button>
//             </form>

//             <hr />
//             <h3>Message History</h3>
//             <ul>
//                 {messages.map((msg) => (
//                     <li key={msg._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
//                         <strong>{msg.senderModel === 'Admin' ? 'Admin' : msg.senderName}</strong>
//                         {' -> '}
//                         <span>{msg.receiverId === 'all' ? 'Broadcast' : (msg.receiverId === 'admin' ? 'Admin' : 'You')}</span>
//                         <br />
//                         <p style={{ margin: '5px 0' }}>{msg.message}</p>
//                         <small>{new Date(msg.createdAt).toLocaleString()}</small>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProviderNotification;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSend, IoPaperPlane } from 'react-icons/io5';
import { HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';

const ProviderNotification = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/messages', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data?.data || []);
        } catch (err) {
            console.error('Failed to fetch provider messages', err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/message/send',
                { message: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error('Failed to send message to admin', err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border border-cyan-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <BiMessageDetail className="text-2xl text-cyan-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Provider Messaging Center
                        </h2>
                        <p className="text-sm text-gray-600 mt-0.5">
                            Communicate with admin and view message history
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
                            <p className="text-sm text-gray-600 mb-1">From Admin</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {messages.filter(m => m.senderModel === 'Admin').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center">
                            <RiAdminLine className="text-xl text-cyan-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Send Message Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <IoPaperPlane className="text-xl" />
                            Send Message to Admin
                        </h3>
                    </div>

                    <form onSubmit={sendMessage} className="p-6 space-y-5">
                        {/* Recipient Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                                <RiAdminLine className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Sending to Admin</p>
                                <p className="text-xs text-gray-600">Your message will be sent to the admin team</p>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Message
                            </label>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message to admin here..."
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <IoSend className="text-lg" />
                            Send to Admin
                        </button>
                    </form>
                </div>

                {/* Message History Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <FiClock className="text-xl" />
                            Message History
                        </h3>
                    </div>

                    <div className="p-6 max-h-[600px] overflow-y-auto space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BiMessageDetail className="text-3xl text-gray-400" />
                                </div>
                                <p className="text-gray-600 font-medium mb-1">No messages yet</p>
                                <p className="text-sm text-gray-500">
                                    Start a conversation with admin
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`rounded-xl p-4 border transition-all duration-200 ${
                                        msg.senderModel === 'Admin'
                                            ? 'bg-cyan-50 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-100/50'
                                            : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {/* Message Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                                                msg.senderModel === 'Admin' 
                                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                                                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                                            }`}>
                                                {msg.senderModel === 'Admin' ? <RiAdminLine className="text-sm" /> : 'P'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {msg.senderModel === 'Admin' ? 'Admin' : msg.senderName || 'You'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    to {msg.receiverId === 'all' ? 'Broadcast' : (msg.receiverId === 'admin' ? 'Admin' : 'You')}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                                                <FiClock className="text-xs" />
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                            {msg.receiverId === 'all' && (
                                                <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200">
                                                    Broadcast
                                                </span>
                                            )}
                                        </div>
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

export default ProviderNotification;