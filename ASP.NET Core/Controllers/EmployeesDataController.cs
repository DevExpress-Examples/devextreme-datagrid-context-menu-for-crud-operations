using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ASP_NET_Core.Controllers
{

    [Route("api/[controller]")]
    public class EmployeesDataController : Controller
    {

        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(EmployeesData.Employees, loadOptions);
        }

        [HttpPost]
        public IActionResult Post(string values)
        {
            var newItem = new Employee();
            JsonConvert.PopulateObject(values, newItem);
            EmployeesData.Employees.Add(newItem);
            return Ok();
        }

        [HttpPut]
        public IActionResult Put(int key, string values)
        {
            var employee = EmployeesData.Employees.FirstOrDefault(e => e.ID == key);
            JsonConvert.PopulateObject(values, employee);
            return Ok();
        }

        [HttpDelete]
        public void Delete(int key)
        {
            var employee = EmployeesData.Employees.FirstOrDefault(e => e.ID == key);
            EmployeesData.Employees.Remove(employee);
        }

    }

}
