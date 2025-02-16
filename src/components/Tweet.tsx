import regexifyString from "regexify-string";

// import Poll from './poll.js';
import PostDTO from "@/app/api/bsky/PostDTO.js";
import { useCardContext } from "@/contexts/CardContext";
import { cn } from "@/lib/utils";

const textColorVariants = {
  "black": "text-black",
  "white": "text-white"
};

const cardColorVariants = {
  "black": "text-black border-black",
  "white": "text-white border-white"
};

function Tweet({
  post,
  textColor
} : {
  post: PostDTO,
  textColor: string | undefined,
}){
  const { card } = useCardContext();

  const { author, text, date } = post;
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    day: "numeric",
    month: "short"
  });

  // TODO: deal with media
  // TODO: is this still necessary?
  // ?? unencode html entities from urls in post
  // TODO: deal with urls and mentions
  // TODO: deal with quoted post

  // [textColor ? cardColorVariants[textColor as keyof typeof cardColorVariants] : ""]: textColor

  const cardSettingsTw = {
    "rounded-xl": card.rounded,
    "border-solid": card.border,
    "bg-transparent": !card.whiteBg,
    "card-shadow": card.shadow
  };

  let cardColorTw = null;
  let textColorTw = null;
  if (textColor) {
    cardColorTw = cardColorVariants[textColor as keyof typeof cardColorVariants];
    textColorTw = textColorVariants[textColor as keyof typeof cardColorVariants]
  }

  return (
    <div className={cn(
      // default card: whiteBg, rounded
      "min-w-3/4 m-4 bg-white p-4 relative border-none border-2 border-foreground xs:m-8 xs:p-6",
      cardSettingsTw,
      cardColorTw
    )}>
      <div className="flex">
        <img className='rounded-full w-8 h-8 mr-2 xs:w-10 xs:h-10' crossOrigin="anonymous" src={author.avatarUrl} />
        <div className='text-tiny leading-3 flex flex-col justify-center xs:text-sm xs:leading-4'>
          <p className="font-bold">{author.displayName}</p>
          <p className={cn(
            "text-secondary",
            textColorTw
          )}>
            @{author.handle}
          </p>
        </div>
      </div>
      <div className='my-3 leading-[1.3] whitespace-pre-wrap text-xs xs:text-base xs:my-4'>{text}</div>
      <div className={cn(
        "text-secondary text-right text-[0.675rem] leading-3 xs:text-sm",
        textColorTw
      )}>{formattedDate}</div>
    </div>
  )
};

export default Tweet;
