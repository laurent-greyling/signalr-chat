using Laurent.Chat.Models;
using Laurent.Chat.Services;
using Microsoft.AspNetCore.Mvc;

namespace Laurent.Chat.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private ISettings _settings;

        public SettingsController(ISettings settings)
        {
            _settings = settings;
        }

        [HttpGet]
        public Appsettings Get()
        {
            return _settings.Get();
        }
    }
}