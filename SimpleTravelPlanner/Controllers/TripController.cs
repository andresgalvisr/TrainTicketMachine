using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SimpleTravelPlanner.Controllers
{
    public class Trip
    {
        public int Id { get; set; }
        public string Destination { get; set; }
        public Nullable<System.DateTime> Start { get; set; }
        public Nullable<System.DateTime> End { get; set; }
        public string Comment { get; set; }
    }
    
    public class TripController : ApiController
    {
        public static List<Trip> trips = new List<Trip>();

        [HttpGet]
        public IEnumerable<Trip> Get()
        {
            return trips;
        }

        public Trip Get(int id)
        {
            return trips.First(c => c.Id == id);
        }

        public HttpResponseMessage Post(Trip trip)
        {
            if (ModelState.IsValid)
            {
                trips.Add(trip);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, trip);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = trip.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        public HttpResponseMessage Put(int id, Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (id != trip.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            trips.Remove(trips.First(c => c.Id == id));
            trips.Add(trip);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(int id)
        {
            Trip trip = trips.First(c => c.Id == id);
            trips.Remove(trip);
            return Request.CreateResponse(HttpStatusCode.OK, trip);
        }
    }
}
