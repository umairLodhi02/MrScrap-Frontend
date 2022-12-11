import React, { useState } from "react";

const FeedBack = ({ user }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment key={user._id}>
      {user && user.feedbacks.length !== 0 && (
        <div className="feedback" onClick={() => setIsActive(!isActive)}>
          <div className="user">
            {user.feedbacks.length !== 0 && (
              <h4>
                {user.username}{" "}
                <span className="length">{user.feedbacks.length}</span>
              </h4>
            )}
          </div>
          {user.feedbacks &&
            user.feedbacks.map((feedback) => {
              return (
                <div
                  className={`message ${isActive && "show"}`}
                  key={feedback._id}
                >
                  {feedback.text}
                </div>
              );
            })}
        </div>
      )}
    </React.Fragment>
  );
};

export default FeedBack;
