using System;

namespace Laurent.Chat.Models
{
    public class MessageModel
    {
        public string Clientuniqueid { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
