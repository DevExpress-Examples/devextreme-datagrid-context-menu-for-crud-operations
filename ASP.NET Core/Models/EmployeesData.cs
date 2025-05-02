using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models
{
    static class EmployeesData
    {
        public static List<Employee> Employees = new List<Employee>() {
            new Employee { ID = 1, FirstName = "John", LastName = "Heart", City = "Los Angeles" },
            new Employee { ID = 2, FirstName = "Olivia", LastName = "Peyton", City = "Los Angeles" },
            new Employee { ID = 3, FirstName = "Robert", LastName = "Reagan", City = "Bentonville" },
            new Employee { ID = 4, FirstName = "Greta", LastName = "Sims", City = "Boise" },
            new Employee { ID = 5, FirstName = "Brett", LastName = "Wade", City = "Atlanta" }
        };
    }
}
