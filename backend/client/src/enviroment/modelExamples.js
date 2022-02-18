//User model input----> 

const user = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  profilePhoto: '',
  mates: [],
  personalToken: ''
}

//Holiday model input ---> 

const holiday = {
  title: '',
  loaction: '',
  latitude: 0,
  longitude: 0,
  date: '',
  description: '',
  image: '',
  private: false,
  holidayTypes: []
}

const holidayType = {
  type: '',
  location: '',
  latitude: 0,
  longitude: 0,
  link: '',
  photo: [],
  description: '',
  vibeTag: [],
  rating: 0,
  private: false
}

