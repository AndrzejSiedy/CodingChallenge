using CodingChallenge.Models;
using CodingChallenge.Services;
using CodingChallenge.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodingChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        private IConfigService _configService;
        public ConfigController(IConfigService configService)
        {
            _configService = configService;
        }

        [HttpGet]
        public IActionResult GetConfig()
        {
            var config = _configService.GetConfig();

            return Ok(new ServiceResponse<ViewConfig>
            {
                Data = config
            });
        }
    }
}
