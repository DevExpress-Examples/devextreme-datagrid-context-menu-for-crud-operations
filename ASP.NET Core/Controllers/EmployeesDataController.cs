using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
            var newItem = JsonSerializer.Deserialize<Employee>(values);
            EmployeesData.Employees.Add(newItem);
            return Ok();
        }

        [HttpPut]
        public IActionResult Put(int key, string values)
        {
            var employee = EmployeesData.Employees.FirstOrDefault(e => e.ID == key);
            if (employee != null)
            {
                var updatedEmployee = JsonSerializer.Deserialize<Employee>(values);
                employee.ID = updatedEmployee.ID;
                employee.FirstName = updatedEmployee.FirstName;
                employee.LastName = updatedEmployee.LastName;
                employee.City = updatedEmployee.City;
            }
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
