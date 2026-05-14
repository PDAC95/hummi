import { useState } from "react";
import Swal from "sweetalert2";

const ChatProp: React.FC = () => {
    const [showChat, setShowChat] = useState<boolean>(false);

    const handleSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const Name = formData.get("name") as string;
        const Email = formData.get("email") as string;
        const Message = formData.get("message") as string;
        if (Name && Email && Message) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your message send successfull!",
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
            setShowChat(false);
        }
    };

    return (
        <>
            <div className="chat-icon">
                <button type="button" onClick={() => setShowChat(true)}>
                    <i className="fa fa-comment"></i>
                </button>
            </div>

            <div id="chat-popup" className={`chat-popup ${showChat ? "popup-visible" : ""}`}>
                <div className="popup-inner">
                    <div className="close-chat" onClick={() => setShowChat(false)}>
                        <i className="fa fa-times"></i>
                    </div>

                    <div className="chat-form">
                        <p>Please fill out the form below and we will get back to you as soon as possible.</p>

                        <form onSubmit={handleSubmitChat}>
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Your Name" required />
                            </div>

                            <div className="form-group">
                                <input type="email" name="email" placeholder="Your Email" required />
                            </div>

                            <div className="form-group">
                                <textarea name="message" placeholder="Your Text" required />
                            </div>

                            <div className="form-group message-btn">
                                <button type="submit" className="thm-btn">
                                    Send Message
                                    <span>
                                        <i className="icon-diagonal-arrow"></i>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatProp;
