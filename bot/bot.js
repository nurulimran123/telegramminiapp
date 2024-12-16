import TelegramBot from "node-telegram-bot-api";

const botToken = "YOUR_BOT_TOKEN"; // Replace with your BotFather token
const bot = new TelegramBot(botToken, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send the game message
  bot.sendGame(chatId, "click_game"); // Replace with your game's short name in BotFather
});

// Handle callback query to launch the game
bot.on("callback_query", (query) => {
  const gameURL = "https://your-game.vercel.app"; // Replace with your hosted game URL

  bot.answerCallbackQuery(query.id, {
    url: gameURL, // Send the game URL to Telegram
  });
});

// Handle score updates
bot.onText(/\/setscore (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const score = parseInt(match[1], 10);

  try {
    await bot.setGameScore(userId, score, { chat_id: chatId, force: true });
    bot.sendMessage(chatId, `Your score of ${score} has been updated!`);
  } catch (error) {
    console.error("Error updating score:", error);
    bot.sendMessage(chatId, "Failed to update the score.");
  }
});
