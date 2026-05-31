type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-2 items-start ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 shrink-0">
          A
        </div>
      )}
      <div
        className={`rounded-lg px-3 py-2 text-sm max-w-sm break-words ${
          isUser
            ? "bg-gray-800 text-white self-end"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {content}
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-white shrink-0">
          U
        </div>
      )}
    </div>
  );
}
