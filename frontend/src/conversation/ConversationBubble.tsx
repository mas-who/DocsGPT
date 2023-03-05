import { forwardRef, useState } from 'react';
import Avatar from '../Avatar';
import { MESSAGE_TYPE } from './conversationModels';
import Alert from './../assets/alert.svg';
import { ReactComponent as Like } from './../assets/like.svg';
import { ReactComponent as Dislike } from './../assets/dislike.svg';

const ConversationBubble = forwardRef<
  HTMLDivElement,
  {
    message: string;
    type: MESSAGE_TYPE;
    className?: string;
  }
>(function ConversationBubble({ message, type, className }, ref) {
  const [showFeedback, setShowFeedback] = useState(false);
  let bubble;
  if (type === 'QUESTION') {
    bubble = (
      <div ref={ref} className={`flex flex-row-reverse self-end ${className}`}>
        <Avatar className="mt-4 text-2xl" avatar="🧑‍💻"></Avatar>
        <div className="mr-2 ml-10 flex items-center rounded-3xl bg-blue-1000 py-5 px-5 text-white">
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
      </div>
    );
  } else {
    bubble = (
      <div
        ref={ref}
        className={`flex self-start ${className}`}
        onMouseEnter={() => setShowFeedback(true)}
        onMouseLeave={() => setShowFeedback(false)}
      >
        <Avatar className="mt-4 text-2xl" avatar="🦖"></Avatar>
        <div
          className={`ml-2 mr-5 flex items-center rounded-3xl bg-gray-1000 py-5 px-5 ${
            type === 'ERROR'
              ? ' rounded-lg border border-red-2000 bg-red-1000 p-2 text-red-3000'
              : ''
          }`}
        >
          {type === 'ERROR' && (
            <img src={Alert} alt="alert" className="mr-2 inline" />
          )}
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
        <div
          className={`mr-2 flex items-center justify-center ${
            type !== 'ERROR' && showFeedback ? '' : 'invisible'
          }`}
        >
          <Like fill="none" className="hover:fill-gray-4000"></Like>
        </div>
        <div
          className={`mr-10 flex items-center justify-center ${
            type !== 'ERROR' && showFeedback ? '' : 'invisible'
          }`}
        >
          <Dislike fill="none" className="hover:fill-gray-4000"></Dislike>
        </div>
      </div>
    );
  }
  return bubble;
});

export default ConversationBubble;
