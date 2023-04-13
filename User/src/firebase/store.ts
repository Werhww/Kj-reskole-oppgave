import { ref } from "vue";

export const user = ref({
    courses: [
        {
            course: 'Kjøretime (A1)',
            time: "15.30 - 17.30",
            date: "2023-04-10T19:26:03+02:00",

            shortAddress: 'Areneset',
            fullAddress: 'Areneset 8, 5350 Bergen',

            amount: "1",
            price: "1000",
            paid: true,
    
            instructor: "Jonson Jones",
            comment: "Bra kjørt, det blir bykjøring neste gang"
        },
        {
            course: 'Traffikalt grunnkurs',
            time: "15.30 - 17.30",
            date: "2023-04-13T19:26:03+02:00",

            shortAddress: 'Areneset',
            fullAddress: 'Areneset 8, 5350 Bergen',

            amount: "1",
            price: "1000",
            paid: true,
    
            instructor: "Jonson Jones",
            comment: "Bra kjørt, det blir bykjøring neste gang"
        },
    ],

    commingcourses: [
        {
            course: 'Kjøretime (A1)',
            time: "15.30 - 17.30",
            date: "2023-04-10T19:26:03+02:00",

            shortAddress: 'Areneset',
            fullAddress: 'Areneset 8, 5350 Bergen',

            amount: "1",
            price: "1000",
            paid: undefined,
    
            instructor: "Jonson Jones",
            comment: ""
        },
        {
            course: 'Traffikalt grunnkurs',
            time: "15.30 - 17.30",
            date: "2023-04-13T19:26:03+02:00",

            shortAddress: 'Areneset',
            fullAddress: 'Areneset 8, 5350 Bergen',

            amount: "1",
            price: "1000",
            paid: undefined,
    
            instructor: "Jonson Jones",
            comment: ""
        },
    ],

    achievements: {
        driveTime: 2,
        achievement: [
            {
                name: "Trafikalt grunnkurs",
                done: true
            },
            {
                name: "Grunnleggende opplæringen",
                done: true
            },
            {
                name: "Sikkerhetskurs i trafikk",
                done: true
            },
            {
                name: "Trinnvurdering (trinn 2)",
                done: false
            },
            {
                name: "Trinnvurdering (trinn 3)",
                done: false
            },
            {
                name: "Sikkerhetskurs på vei",
                done: false
            },
            
            {
                name: "Teorie prøven",
                done: false
            },
            {
                name: "Mørkekjøring",
                done: false
            },
        ]
    }
});
