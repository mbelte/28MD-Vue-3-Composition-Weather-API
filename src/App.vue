<template>
    <div class="container">
        <div class="header">
            Weather App
        </div>
        <div class="controls">
            <input 
                type="text"
                class="input"
                placeholder="Enter location ..."
                @keyup.enter="getWeatherBySearch"
            >
            <Switch 
                v-if="metricOrImperial"
                :title="metricOrImperial.switchTitle"
                @change="setUnit"
            />
        </div>
            
        <Loader v-if="isLoading" />

        <Error v-else-if="errorMessage">
            {{ errorMessage }}
        </Error>

        <WeatherList 
            v-else-if="state.weather.location && metricOrImperial"
            :weather="state.weather"
        >
            <WeatherItem
                :title="'City'"
                :value="state.weather.location.name"
            />
            <WeatherItem
                :title="'Country'"
                :value="state.weather.location.country"
            />
            <WeatherItem
                :title="'Local time'"
                :value="state.weather.location.localtime"
            />
            <WeatherItem
                :title="'Temperature'"
                :value="metricOrImperial.temp.value"
                :unit="metricOrImperial.temp.unit"
            />
            <WeatherItem
                :title="'Feels like'"
                :value="metricOrImperial.feelslike.value"
                :unit="metricOrImperial.feelslike.unit"
            />
            <WeatherItem
                :title="'Humidity'"
                :value="state.weather.current.humidity"
                :unit="'%'"
            />
            <WeatherItem
                :title="'Wind'"
                :value="metricOrImperial.wind.value"
                :unit="metricOrImperial.wind.unit"
            />
            <WeatherItem
                :title="'Last updated'"
                :value="state.weather.current.last_updated"
            />
        </WeatherList>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted, computed } from 'vue';
    import WeatherAPI from './services/WeatherAPI'

    import Loader from './components/Loader.vue'
    import Error from './components/Error.vue';
    import Switch from './components/Switch.vue';
    import WeatherList from './components/WeatherList.vue'
    import WeatherItem from './components/WeatherItem.vue';

    import type { WeatherRequest } from './types/types';

    type State = {
        weather: WeatherRequest
    }

    let state = reactive({ weather: {} }) as State
    let isMetricUnits = ref(false);
    let isLoading = ref(false);
    let errorMessage = ref('');
    let metricOrImperial = reactive({})

    const getWeather = async (location: string) => {
        isLoading.value = true;
        errorMessage.value = '';

        await WeatherAPI
                .getWeather(location)
                .then((response) => {
                    state.weather = response.data;

                    setUnit()
                    isLoading.value = false;
                })
                .catch ((error) => {
                    isLoading.value = false;
                    console.error(error);
                    errorMessage.value = error.response.data.error.message;
                })
    };

    const getWeatherBySearch = (event: Event) => {
        const location = (event.target as HTMLInputElement).value;             
        getWeather(location);
    };

    onMounted(() => {
        getWeather('jelgava');
    });

    const setUnit =() => {
        isMetricUnits.value = !isMetricUnits.value
        console.log('metric',isMetricUnits)

        if (isMetricUnits) {
            metricOrImperial = {
                temp: {
                    value: state.weather.current.temp_c,
                    unit: '°C'
                },
                feelslike: {
                    value: state.weather.current.feelslike_c,
                    unit: '°C'
                },
                wind: {
                    value: state.weather.current.wind_kph,
                    unit: 'km/h'
                },
                switchTitle: 'Switch to imperial'
            };
        } else {
            metricOrImperial = {
                temp: {
                    value: state.weather.current.temp_f,
                    unit: '°F'
                },
                feelslike: {
                    value: state.weather.current.feelslike_c,
                    unit: '°F'
                },
                wind: {
                    value: state.weather.current.wind_mph,
                    unit: 'mp/h'
                },
                switchTitle: 'Switch to metric'
            };
        }
    }


</script>
