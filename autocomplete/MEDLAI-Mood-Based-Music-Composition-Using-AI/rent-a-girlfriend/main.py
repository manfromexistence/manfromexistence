from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

# Replace with your bot's access token
BOT_TOKEN = "YOUR_ACCESS_TOKEN"

def start(update, context):
  update.message.reply_text("Hello! I'm your new Telegram bot.")

def echo(update, context):
  update.message.reply_text(update.message.text)

def payment(update, context):
  # Placeholder function for future payment handling logic
  update.message.reply_text("This feature is under development! Coming soon for secure payments.")

def main():
  updater = Updater(token=BOT_TOKEN, use_context=True)
  dispatcher = updater.dispatcher

  # Handler for /start command
  dispatcher.add_handler(CommandHandler("start", start))

  # Handler for any message
  dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, echo))

  # Placeholder handler for future /payment command
  dispatcher.add_handler(CommandHandler("payment", payment))

  updater.start_polling()
  updater.idle()

if __name__ == "__main__":
  main()
