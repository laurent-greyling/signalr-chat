using System.Text.Json.Serialization;

namespace Laurent.Chat.Models
{
    /// <summary>
    /// App settings
    /// </summary>
    public class Appsettings
    {
        /// <summary>
        /// Connectionstring to signalr serverless
        /// </summary>
        public string AzureSignalRConnection { get; set; }

        /// <summary>
        /// Application insights instrumentation key
        /// </summary>
        [JsonPropertyName("appInsightsInstrumentationKey")]
        public string APPINSIGHTS_INSTRUMENTATIONKEY { get; set; }
    }
}
