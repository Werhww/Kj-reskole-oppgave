import { ref, watch } from "vue";
import moment from "moment";

const user = ref({
    payedCoursesSum: 5600,
    commingCoursesSum: 3400,

});

const achievements = ref({
    driveTime: 9,
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
})

/* all courses combined & sorter for previus courses and comming courses */
interface CourseProps {
    course: string,
    time: string,
    date: string,

    shortAddress: string,
    fullAddress: string,

    amount: number,
    price: number,
    paid: boolean | undefined,

    instructor: string,
    comment: string
}

const allCourses= ref<CourseProps[]>([])

const previousCourses = ref<[] | any>([])

const commingCourses = ref<[] | any>([])

watch(allCourses, (item) => {
    const now = moment().format()

    item.forEach((course:any) => {
        let test = moment(course.date).isAfter(now)
        if (test) {
            commingCourses.value.push(course)
        } else if (!test) {
            previousCourses.value.push(course)
        }
    })
})

setTimeout(() => {
    allCourses.value = [{
        course: 'Kjøretime (A1)',
        time: "15.30 - 17.30",
        date: "2023-04-19T19:26:03+02:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: "Bra kjørt, det blir bykjøring neste gang"
    },
    {
        course: 'Traffikalt grunnkurs Man',
        time: "15.30 - 17.30",
        date: "2023-04-10T19:26:03+02:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: false,

        instructor: "Jonson Jones",
        comment: "Bra kjørt, det blir bykjøring neste gang"
    },
    {
        course: 'Kjøretime (A1)',
        time: "15.30 - 17.30",
        date: "2023-04-18T19:26:03+02:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: ""
    },
    {
        course: 'Traffikalt grunnkurs',
        time: "15.30 - 17.30",
        date: "2023-04-15T19:26:03+02:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: ""
    },
    {
        course: 'Traffikalt grunnkurs Tirsdag',
        time: "15.30 - 17.30",
        date: "2023-04-11T19:26:03+02:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: true,

        instructor: "Jonson Jones",
        comment: ""
    }]
}, 1000)

export {
    achievements,
    allCourses,
    previousCourses,
    commingCourses,
    user
}