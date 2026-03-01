// pages/giveaway/gw-tasks.jsx
import { useState, useEffect } from "react";
import { DollarSign, Users, Zap, Twitter, Send, Heart, Repeat, Check, ExternalLink, Info } from "lucide-react";
import toast from "react-hot-toast";

const GiveawayTasks = ({ address, points, mmvBalance, referralVolume, activeReferrals, onTaskComplete }) => {
    const [tweets, setTweets] = useState([]);
    const [loadingTweets, setLoadingTweets] = useState(true);
    const [completingTask, setCompletingTask] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(new Set());

    const MMV_PRICE = 0.008;

    useEffect(() => {
        if (address) {
            setLoadingTweets(true);
            fetchAllTasks();
        }
    }, [address]); 

    // Fetch ALL completed tasks (tweets + social tasks)
    const fetchAllTasks = async () => {
        if (!address) return;
        
        try {
            setLoadingTweets(true);
            
            // Fetch tweets and their completion status
            const tweetsResponse = await fetch(`/api/giveaway/get_tweets?wallet=${address}`);
            if (!tweetsResponse.ok) {
                throw new Error('Failed to fetch tweets');
            }
            const tweetsData = await tweetsResponse.json();
            setTweets(tweetsData.tweets || []);
            
            // Mark completed tasks
            const completed = new Set();
            
            // Add tweet tasks
            tweetsData.tweets?.forEach(tweet => {
                if (tweet.userHasLiked) completed.add(`tweet_like_${tweet.tweet_id}`);
                if (tweet.userHasRetweeted) completed.add(`tweet_retweet_${tweet.tweet_id}`);
            });

            // Fetch social tasks completion status (Twitter follow, Telegram join)
            const socialTasksResponse = await fetch(`/api/giveaway/get_completed_tasks?wallet=${address}`);
            if (!socialTasksResponse.ok) {
                throw new Error('Failed to fetch social tasks');
            }
            const socialTasksData = await socialTasksResponse.json();
            
            // Add social tasks to completed set
            if (socialTasksData.completedTasks && Array.isArray(socialTasksData.completedTasks)) {
                socialTasksData.completedTasks.forEach(task => {
                    // Task format from backend: { task_type, task_identifier }
                    const taskKey = `${task.task_type}_${task.task_identifier}`;
                    completed.add(taskKey);
                });
            }

            setCompletedTasks(completed);
        } catch (err) {
            console.error('❌ Error fetching tasks:', err);
            toast.error('Failed to load tasks');
        } finally {
            setLoadingTweets(false);
        }
    };

    const completeTask = async (taskType, taskIdentifier, pointsEarned) => {
        const taskKey = `${taskType}_${taskIdentifier}`;
        setCompletingTask(taskKey);
        
        try {
            const response = await fetch('/api/giveaway/complete_task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress: address,
                    taskType,
                    taskIdentifier,
                    pointsEarned
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`+${pointsEarned} points! 🎉`, {
                    style: {
                        background: 'linear-gradient(135deg, #4b5ae4, #6d7aff)',
                        color: '#fff',
                    }
                });
                
                // Update completed tasks state immediately
                setCompletedTasks(prev => new Set([...prev, taskKey]));
                
                // Refresh all tasks to ensure sync with backend
                fetchAllTasks();
                
                // Notify parent component to refresh points
                onTaskComplete();
            } else {
                toast.error(data.message || 'Failed to complete task');
            }
        } catch (err) {
            toast.error('Error completing task');
            console.error('Task completion error:', err);
        } finally {
            setCompletingTask(null);
        }
    };

    const openTwitterTask = (url, taskType, taskId, points) => {
        window.open(url, '_blank');
        // Show completion button after opening link
        setTimeout(() => {
            toast('Did you complete the task?', {
                duration: 10000,
                icon: '👆',
                style: {
                    background: 'rgba(75, 90, 228, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    border: '1px solid rgba(75, 90, 228, 0.3)',
                }
            });
        }, 2000);
    };

    // Calculate current points from purchases
    const personalPurchaseValue = mmvBalance * MMV_PRICE;
    const personalPurchasePoints = Math.floor((personalPurchaseValue / 100) * 20);
    
    const referralPurchaseValue = referralVolume * MMV_PRICE;
    const referralPurchasePoints = Math.floor((referralPurchaseValue / 100) * 10);
    
    const activeReferralPoints = activeReferrals * 5;

    return (
        <section className="gw-tasks">
            <div className="gw-tasks-header">
                <h2 className="gw-section-title">
                    <Zap className="gw-title-icon" />
                    Earn More Points
                </h2>
                <p className="gw-tasks-subtitle">
                    Complete tasks below to boost your ranking and increase your chances of winning
                </p>
            </div>

            {/* Purchase-Based Points */}
            <div className="gw-task-category">
                <h3 className="gw-category-title">
                    <DollarSign size={20} />
                    Purchase & Referral Points
                </h3>
                <p className="gw-category-desc">Automatic points from your activity</p>

                <div className="gw-task-grid">
                    {/* Personal Purchases */}
                    <div className="gw-task-card auto">
                        <div className="gw-task-icon">
                            <DollarSign size={24} />
                        </div>
                        <div className="gw-task-content">
                            <h4 className="gw-task-title">Personal Purchases</h4>
                            <p className="gw-task-desc">20 points per $100 spent</p>
                            <div className="gw-task-stats">
                                <span className="gw-task-stat-label">Current:</span>
                                <span className="gw-task-stat-value">${personalPurchaseValue.toFixed(2)} = {personalPurchasePoints} pts</span>
                            </div>
                        </div>
                        <a href="/" className="gw-task-btn secondary">
                            <ExternalLink size={16} />
                            Buy More
                        </a>
                    </div>

                    {/* Referral Purchases */}
                    <div className="gw-task-card auto">
                        <div className="gw-task-icon">
                            <Users size={24} />
                        </div>
                        <div className="gw-task-content">
                            <h4 className="gw-task-title">Referral Purchases</h4>
                            <p className="gw-task-desc">10 points per $100 referred</p>
                            <div className="gw-task-stats">
                                <span className="gw-task-stat-label">Current:</span>
                                <span className="gw-task-stat-value">${referralPurchaseValue.toFixed(2)} = {referralPurchasePoints} pts</span>
                            </div>
                        </div>
                        <a href="/referral" className="gw-task-btn secondary">
                            <ExternalLink size={16} />
                            Get Link
                        </a>
                    </div>

                    {/* Active Referrals */}
                    <div className="gw-task-card auto">
                        <div className="gw-task-icon">
                            <Zap size={24} />
                        </div>
                        <div className="gw-task-content">
                            <h4 className="gw-task-title">Active Referrals</h4>
                            <p className="gw-task-desc">5 points per active referral</p>
                            <div className="gw-task-stats">
                                <span className="gw-task-stat-label">Current:</span>
                                <span className="gw-task-stat-value">{activeReferrals} referrals = {activeReferralPoints} pts</span>
                            </div>
                        </div>
                        <a href="/referral" className="gw-task-btn secondary">
                            <ExternalLink size={16} />
                            Refer Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Social Tasks */}
            <div className="gw-task-category">
                <h3 className="gw-category-title">
                    <Twitter size={20} />
                    Social Media Tasks
                </h3>
                <p className="gw-category-desc">Complete these one-time tasks to earn bonus points</p>

                {/* Honor System Notice */}
                <div className="gw-honor-notice">
                    <Info size={16} />
                    <span>Complete tasks honestly - all submissions verified at giveaway end</span>
                </div>

                <div className="gw-task-grid">
                    {/* Twitter Follow */}
                    <div className="gw-task-card">
                        <div className="gw-task-icon">
                            <Twitter size={24} />
                        </div>
                        <div className="gw-task-content">
                            <h4 className="gw-task-title">Follow @metamemevault</h4>
                            <p className="gw-task-desc">Follow us on X (Twitter)</p>
                            <div className="gw-task-points">+50 points</div>
                        </div>
                        {completedTasks.has('twitter_follow_twitter_follow') ? (
                            <div className="gw-task-completed">
                                <Check size={18} />
                                Completed
                            </div>
                        ) : completingTask === 'twitter_follow_twitter_follow' ? (
                            <button className="gw-task-btn" disabled>
                                <div className="gw-spinner-small"></div>
                                Saving...
                            </button>
                        ) : (
                            <a 
                                href="https://twitter.com/metamemevault" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="gw-task-btn primary"
                                onClick={(e) => {
                                    setTimeout(() => {
                                        toast(
                                            (t) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <span style={{ fontWeight: 600 }}>Did you follow @metamemevault?</span>
                                                    <button
                                                        onClick={() => {
                                                            toast.dismiss(t.id);
                                                            completeTask('twitter_follow', 'twitter_follow', 50);
                                                        }}
                                                        style={{
                                                            padding: '10px 20px',
                                                            background: 'linear-gradient(135deg, #4b5ae4, #6d7aff)',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        ✓ Yes, I Followed
                                                    </button>
                                                </div>
                                            ),
                                            { 
                                                duration: 15000,
                                                style: {
                                                    background: 'rgba(75, 90, 228, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    color: '#fff',
                                                    border: '1px solid rgba(75, 90, 228, 0.3)',
                                                }
                                            }
                                        );
                                    }, 2000);
                                }}
                            >
                                <Twitter size={16} />
                                Follow @metamemevault
                            </a>
                        )}
                    </div>

                    {/* Telegram Join */}
                    <div className="gw-task-card">
                        <div className="gw-task-icon">
                            <Send size={24} />
                        </div>
                        <div className="gw-task-content">
                            <h4 className="gw-task-title">Join Telegram</h4>
                            <p className="gw-task-desc">Join our community</p>
                            <div className="gw-task-points">+50 points</div>
                        </div>
                        {completedTasks.has('telegram_join_telegram_join') ? (
                            <div className="gw-task-completed">
                                <Check size={18} />
                                Completed
                            </div>
                        ) : completingTask === 'telegram_join_telegram_join' ? (
                            <button className="gw-task-btn" disabled>
                                <div className="gw-spinner-small"></div>
                                Saving...
                            </button>
                        ) : (
                            <a 
                                href="https://t.me/metamemevault_chat" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="gw-task-btn primary"
                                onClick={(e) => {
                                    setTimeout(() => {
                                        toast(
                                            (t) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <span style={{ fontWeight: 600 }}>Did you join our Telegram?</span>
                                                    <button
                                                        onClick={() => {
                                                            toast.dismiss(t.id);
                                                            completeTask('telegram_join', 'telegram_join', 50);
                                                        }}
                                                        style={{
                                                            padding: '10px 20px',
                                                            background: 'linear-gradient(135deg, #4b5ae4, #6d7aff)',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        ✓ Yes, I Joined
                                                    </button>
                                                </div>
                                            ),
                                            { 
                                                duration: 15000,
                                                style: {
                                                    background: 'rgba(75, 90, 228, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    color: '#fff',
                                                    border: '1px solid rgba(75, 90, 228, 0.3)',
                                                }
                                            }
                                        );
                                    }, 2000);
                                }}
                            >
                                <Send size={16} />
                                Join Telegram
                            </a>
                        )}
                    </div>
                </div>

                {/* Tweet Tasks */}
                {!loadingTweets && tweets.length > 0 && (
                    <div className="gw-tweet-tasks">
                        <h4 className="gw-tweet-tasks-title">Engage with Our Tweets</h4>
                        {tweets.map((tweet) => (
                            <div key={tweet.id} className="gw-tweet-task-card">
                                <div className="gw-tweet-header">
                                    <Twitter size={18} />
                                    <span className="gw-tweet-desc">{tweet.description || 'Engagement Task'}</span>
                                </div>
                                <div className="gw-tweet-actions">
                                    {/* Like Task */}
                                    {completedTasks.has(`tweet_like_${tweet.tweet_id}`) ? (
                                        <div className="gw-tweet-action completed">
                                            <Check size={16} />
                                            Liked (+{tweet.like_points} pts)
                                        </div>
                                    ) : completingTask === `tweet_like_${tweet.tweet_id}` ? (
                                        <button className="gw-tweet-action" disabled>
                                            <div className="gw-spinner-small"></div>
                                        </button>
                                    ) : (
                                        <>
                                            <a 
                                                href={tweet.tweet_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="gw-tweet-action primary"
                                                onClick={() => openTwitterTask(tweet.tweet_url, 'tweet_like', tweet.tweet_id, tweet.like_points)}>
                                                <Heart size={16} />
                                                Like (+{tweet.like_points})
                                            </a>
                                            <button
                                                className="gw-tweet-action secondary"
                                                onClick={() => completeTask('tweet_like', tweet.tweet_id, tweet.like_points)}>
                                                <Check size={14} />
                                            </button>
                                        </>
                                    )}

                                    {/* Retweet Task */}
                                    {completedTasks.has(`tweet_retweet_${tweet.tweet_id}`) ? (
                                        <div className="gw-tweet-action completed">
                                            <Check size={16} />
                                            Retweeted (+{tweet.retweet_points} pts)
                                        </div>
                                    ) : completingTask === `tweet_retweet_${tweet.tweet_id}` ? (
                                        <button className="gw-tweet-action" disabled>
                                            <div className="gw-spinner-small"></div>
                                        </button>
                                    ) : (
                                        <>
                                            <a 
                                                href={tweet.tweet_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="gw-tweet-action primary"
                                                onClick={() => openTwitterTask(tweet.tweet_url, 'tweet_retweet', tweet.tweet_id, tweet.retweet_points)}>
                                                <Repeat size={16} />
                                                Retweet (+{tweet.retweet_points})
                                            </a>
                                            <button
                                                className="gw-tweet-action secondary"
                                                onClick={() => completeTask('tweet_retweet', tweet.tweet_id, tweet.retweet_points)}>
                                                <Check size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GiveawayTasks;