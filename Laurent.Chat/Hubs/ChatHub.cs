using Laurent.Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Laurent.Chat.Hubs
{
	public class ChatHub : Hub
	{
		public async Task SendMessage(MessageModel message)
		{
			await Clients.All.SendAsync("ReceiveMessage", message);
		}

		public void Echo(string name, string message)
		{
			Clients.Client(Context.ConnectionId).SendAsync("echo", name, message + " (echo from server)");
		}

	}
}
