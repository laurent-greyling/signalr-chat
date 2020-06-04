using Laurent.Chat.Models;

namespace Laurent.Chat.Services
{
    public interface ISettings
    {
        /// <summary>
        /// Get appsettings
        /// </summary>
        /// <returns></returns>
        Appsettings Get();
    }
}
