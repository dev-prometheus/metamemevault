import { useState } from "react";
import PageFooter from "../components/footer";
import "../styles/contact.css";
import toast from "react-hot-toast";
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import { Send, Twitter, MessageCircle, Mail, Zap, Shield, Users, Rocket } from "lucide-react";
import { CONTACT_EMAIL, TELEGRAM_LINK, TWITTER_LINK } from "../config/social_helpers";
import SEO from "../components/SEO";

const PageContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        nickname: "", // bot prevention field
        timestamp: Date.now()
    });
    const [loading, setLoading] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");

    const contactReasons = [
        { id: "partnership", label: "Partnership Proposal", icon: Rocket },
        { id: "technical", label: "Technical Support", icon: Shield },
        { id: "investment", label: "Investment Inquiry", icon: Zap },
        { id: "general", label: "General Question", icon: MessageCircle }
    ];

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const sanitizeInput = (text) => {
        return text
            .replace(/<script.*?>.*?<\/script>/gi, "")
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/[{}<>$]/g, "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // bot check
        if (formData.nickname && formData.nickname.trim() !== "") {
            toast.error("Bot detected.");
            return;
        }
        // Delay check 
        const now = Date.now();
        if (now - formData.timestamp < 3000) {
            toast.error("Form submitted too quickly.");
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill out all fields.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // sanitized inputs
        const sanitizedFormData = {
            ...formData,
            name: sanitizeInput(formData.name),
            message: sanitizeInput(formData.message),
            reason: selectedReason
        };

        setLoading(true);

        try {
            const emailRes = await fetch(`/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitizedFormData),
            });

            if (!emailRes.ok) throw new Error("Email failed");

            toast.success("Message sent successfully! We'll get back to you within 24 hours.");
            setFormData({ name: "", email: "", message: "", nickname: "", timestamp: Date.now() });
            setSelectedReason("");

        } catch (err) {
            toast.error("Failed to send message!");
            console.error("error submitting form", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with the MetaMemeVault team. We're here to answer your questions about the presale and tokenomics."
                keywords="Contact MetaMemeVault, Support, Help"
                url="https://www.metamemevault.com/contact"
            />
            <div className="div-page">
                <PriceTickerMarquee />
                <PageNavbar />
                <main className="ct-main">
                    {/* Animated Background */}
                    <div className="ct-bg-wrapper">
                        <div className="ct-gradient-orb ct-orb-1"></div>
                        <div className="ct-gradient-orb ct-orb-2"></div>
                        <div className="ct-grid-pattern"></div>
                        <div className="ct-floating-shapes">
                            <div className="ct-shape ct-shape-1"></div>
                            <div className="ct-shape ct-shape-2"></div>
                            <div className="ct-shape ct-shape-3"></div>
                        </div>
                    </div>

                    {/* Contact Container */}
                    <div className="ct-container">
                        <div className="ct-header">
                            <div className="ct-badge">
                                <Zap className="ct-badge-icon" />
                                <span>Get in Touch</span>
                            </div>
                            <h1 className="ct-title">
                                <span className="ct-title-gradient">Let's Build the</span>
                                <span className="ct-title-accent"> Future Together</span>
                            </h1>
                            <p className="ct-subtitle">
                                Got questions about $MMV? Want to partner up?
                                Or just wanna say GM? Drop us a message and we'll get back to you faster than a MEV bot.
                            </p>
                        </div>

                        <div className="ct-content-wrapper">
                            {/* Quick Connect Cards */}
                            <div className="ct-quick-connect">
                                <h3 className="ct-section-title">Quick Connect</h3>
                                <div className="ct-social-cards">
                                    <a
                                        href={TWITTER_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ct-social-card">
                                        <Twitter className="ct-social-icon" />
                                        <div className="ct-social-info">
                                            <span className="ct-social-name">Twitter/X</span>
                                            <span className="ct-social-desc">Follow for updates</span>
                                        </div>
                                    </a>
                                    <a
                                        href={TELEGRAM_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ct-social-card">
                                        <Send className="ct-social-icon" />
                                        <div className="ct-social-info">
                                            <span className="ct-social-name">Telegram</span>
                                            <span className="ct-social-desc">Join the community</span>
                                        </div>
                                    </a>
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="ct-social-card">
                                        <Mail className="ct-social-icon" />
                                        <div className="ct-social-info">
                                            <span className="ct-social-name">Email</span>
                                            <span className="ct-social-desc">Direct contact</span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="ct-form-wrapper">
                                <h3 className="ct-section-title">Send us a Message</h3>

                                {/* Reason Selection */}
                                <div className="ct-reason-pills">
                                    {contactReasons.map((reason) => {
                                        const Icon = reason.icon;
                                        return (
                                            <button
                                                key={reason.id}
                                                type="button"
                                                className={`ct-reason-pill ${selectedReason === reason.id ? 'ct-active' : ''}`}
                                                onClick={() => setSelectedReason(reason.id)}>
                                                <Icon className="ct-pill-icon" />
                                                <span>{reason.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="ct-form-container">
                                    <div className="ct-form-row">
                                        <div className="ct-form-group">
                                            <label htmlFor="name" className="ct-label">
                                                <Users className="ct-label-icon" />
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Satoshi Nakamoto"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="ct-input"
                                            />
                                        </div>

                                        <div className="ct-form-group">
                                            <label htmlFor="email" className="ct-label">
                                                <Mail className="ct-label-icon" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="degen@metamemevault.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="ct-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="ct-form-group">
                                        <label htmlFor="message" className="ct-label">
                                            <MessageCircle className="ct-label-icon" />
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Tell us what's on your mind... Partnership proposals, technical questions, or just vibing about memecoins?"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="ct-textarea"
                                            rows={6}
                                        />
                                    </div>

                                    {/* Bot Prevention - Hidden Field */}
                                    <input
                                        type="text"
                                        name="nickname"
                                        value={formData.nickname}
                                        onChange={handleChange}
                                        style={{ display: "none" }}
                                        autoComplete="off" />

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="ct-submit-btn">
                                        {loading ? (
                                            <>
                                                <div className="ct-spinner"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="ct-btn-icon" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="ct-response-time">
                                        <Shield className="ct-time-icon" />
                                        Average response time: 24 hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="ct-trust-section">
                            <div className="ct-trust-item">
                                <Shield className="ct-trust-icon" />
                                <div className="ct-trust-info">
                                    <span className="ct-trust-label">Secure</span>
                                    <span className="ct-trust-desc">End-to-end encrypted</span>
                                </div>
                            </div>
                            <div className="ct-trust-item">
                                <Users className="ct-trust-icon" />
                                <div className="ct-trust-info">
                                    <span className="ct-trust-label">Community</span>
                                    <span className="ct-trust-desc">10K+ members strong</span>
                                </div>
                            </div>
                            <div className="ct-trust-item">
                                <Zap className="ct-trust-icon" />
                                <div className="ct-trust-info">
                                    <span className="ct-trust-label">Fast</span>
                                    <span className="ct-trust-desc">Quick responses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <PageFooter />
            </div>
        </>
    );
}

export default PageContactForm;