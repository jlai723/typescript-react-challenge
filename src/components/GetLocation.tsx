import React, {Component} from "react";

type GetLocationProps = {};
type GetLocationState = {
    latitude: number,
    longitude: number,
    currentTemp: number,
    description: string,
};

export class GetLocation extends Component <GetLocationProps, GetLocationState> {
    constructor(props: GetLocationProps) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            currentTemp: 0,
            description: "",
        }
        this.setLocation = this.setLocation.bind(this);
        this.showWeather = this.showWeather.bind(this);
    }

    componentDidMount() {
        this.setLocation();
        this.showWeather();
    }

    setLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }

    showWeather() {
        let apiKey = "dcee62d41438be11823b7568498cc8e9"

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=imperial&appid=${apiKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    currentTemp: json.main.temp,
                    description: json.weather[0].description,
                })
            })
            .catch(err => console.log(err))
    }
    
    render () {
        return (
            <div>
                <h3>Current temperature: {this.state.currentTemp}&#8457;</h3>
                <h5>The weather is currently {this.state.description}.</h5> 
            </div>
        )
    }
}