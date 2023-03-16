<template>
    <h1 v-if="isLoading">Loading ...</h1>
    <h1 v-else-if="state.weather.location">
        data received
        <br>
        {{ state.weather.location.country }}
    </h1>
</template>

<script lang="ts">
    import { ref, reactive, onMounted, computed } from 'vue';
    import WeatherAPI from './services/WeatherAPI'

    export type WeatherRequest = {
        location: WeatherLocation;
        current: WeatherCurrent;
    }

    type WeatherLocation = {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    }

    type WeatherCurrent = {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: WeatherCondition;
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    }

    type WeatherCondition = {
        text: string;
        icon: string;
        code: number;
    }

    type State = {
        weather: WeatherRequest
    }
    

    export default {
        setup() {
            let state = reactive({ weather: {} }) as State
            let isLoading = ref(false)

            const getWeather = async (location: string) => {
                isLoading.value = true

                await WeatherAPI
                        .getWeather(location)
                        .then((response) => {
                            state.weather = response.data
                            isLoading.value = false
                        })
                        .catch ((error) => {
                            console.error(error);
                        })
            }

            onMounted(() => {
                getWeather('jelgava');
            })

            return {
                isLoading,
                state
            }
        },

        
    }
</script>
