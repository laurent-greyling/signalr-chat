using Laurent.Chat.Models;
using Laurent.Chat.Utilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Laurent.Chat.Services
{
    public class Settings : ISettings
    {
        private readonly Appsettings _settings;
        private readonly ILogger<Settings> _log;

        public Settings(IOptions<Appsettings> settings,
            ILogger<Settings> log)
        {
            Ensure.ArgumentNotNull(settings, nameof(settings));
            Ensure.ArgumentNotNull(log, nameof(log));

            _settings = settings.Value;
            _log = log;
        }

        public Appsettings Get()
        {
            if (string.IsNullOrWhiteSpace(_settings.AzureSignalRConnection)
                || string.IsNullOrWhiteSpace(_settings.APPINSIGHTS_INSTRUMENTATIONKEY))
            {
                //If the appsettings are not all set we do not throw, we only log a warning and continue
                //Note: If instrumentation key is not set, this will only log to console window and not app insights
                //TODO: Maybe rather throw, if a seeting is not there the app will not function correctly...?
                var appsettings = JsonConvert.SerializeObject(_settings);
                _log.LogWarning($"WARNING: Not all appsettings are correctly set, see: {appsettings}");
            }

            return _settings;
        }
    }
}
