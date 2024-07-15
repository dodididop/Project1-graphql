Here it is how you can call operations from Apollo Server:
  query getAllUsers{
  users {
    id
    email
    username

  }
}

query getAllEvents{
  events {
    id
    date
    desc
    from
    location_id
    title
    to
    user_id
  }
}

query getAllParticipants{
  participants {
    id
    event_id
    user_id
  }
}

query getAllLocations{
  locations {
    id
    desc
    lat
    lng
    name
  }
}

query getUser{
  user(id: "1") {
    id
    username
    email
  }
}

query getEvent{
  event(id:"1"){
    id
    desc
    date
    from
    to
    title
    user_id
    location_id
  }
}

query getParticipant{
  participant(id: "1") {
    id
    user_id
    event_id
  }
}

query getLocation{
  location(id:"1"){
    id
    desc
    name
    lat
    lng
  }
}

query getEventsDetails{
  events {
     id
    title
    user{
      id
      username
    }
    participants {
      id
      username
    }
    location{
      id
      name
    }
  }
   
  }
