import { ref, watch } from "vue";
import moment from "moment";

/* all achievements and time driven */
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
    startTime: string,
    endTime: string,

    shortAddress: string,
    fullAddress: string,

    amount: number,
    price: number,
    paid: boolean | undefined,

    instructor: string,
    comment: string

    student: string

    studentID: string
    instructorID: string
    courseID: string
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

/* All instructors with name and ID */
interface instructorsProps {
    name: string,
    instructorID: string,
}

const allInstructors = ref<instructorsProps[]>([
    {
        name: "Leo",
        instructorID: "1",
    },
    {
        name: "Felix",
        instructorID: "12",
    },
    {
        name: "Trym",
        instructorID: "123",
    },
    {
        name: "Jones",
        instructorID: "1234",
    },
    {
        name: "Flekal",
        instructorID: "12345",
    }
])


interface placesProps {
    name: string,
    fullAddress: string,
}

const allPlaces = ref<placesProps[]>([
    {
        name: "Kjøresenteret",
        fullAddress: "Kjøresenteret, 7030 Trondheim"
    },
    {
        name: "Kjøreskolen",
        fullAddress: "Kjøreskolen, 7030 Trondheim"
    }
])


/* Chats and chats messages */

interface chatMessages {
    instructorID: string;
    messages: {
        from: string;
        message: string;
        datetime: string;
    }[]
}

const chatMessages = ref<chatMessages[]>([
    {
        instructorID: "1246145",
        messages: [
            {
                from: "instructor",
                message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                datetime: "2023-04-19T18:01:16+02:00"
            },
            {
                from: "user",
                message: "NO3345",
                datetime: "2023-04-19T17:01:16+02:00"
            },
            {
                from: "instructor",
                message: "Hello",
                datetime: "2023-04-19T15:01:16+02:00"
            },
            {
                from: "user",
                message: "Hello1234",
                datetime: "2023-04-18T11:01:16+02:00"
            },
            {
                from: "instructor",
                message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                datetime: "2023-04-11T09:01:16+02:00"
            },
        ]
    },
    {
        instructorID: "12214545",
        messages: [
            {
                from: "instructor",
                message: "Who is this",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "instructor",
                message: "Hello",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "user",
                message: "Hello",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "user",
                message: "NO",
                datetime: "2023-04-19T12:01:16+02:00"
            }
        ]
    },
    {
        instructorID: "12345",
        messages: [
            {
                from: "instructor",
                message: "Who is this123",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "instructor",
                message: "Hellowqgqwg",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "user",
                message: "Helloqfeqt",
                datetime: "2023-04-19T12:01:16+02:00"
            },
            {
                from: "user",
                message: "NOrrr",
                datetime: "2023-04-19T12:01:16+02:00"
            }
        ]
    },
])

setTimeout(() => {
    allCourses.value = [{
        course: 'Kjøretime (A1)',
        startTime: "2021-09-13T03:00:00",
        endTime: "2021-09-13T04:30:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: "Bra kjørt, det blir bykjøring neste gang",

        student:"Jonson Jones",

        studentID: "1234",
        courseID: "1",
        instructorID: "1",
    },
    {
        course: 'Traffikalt grunnkurs',
        startTime: "2021-09-14T03:00:00",
        endTime: "2021-09-14T04:30:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: false,

        instructor: "Jonson Jones",
        comment: "Bra kjørt, det blir bykjøring neste gang",

        student:"Jonson Jones",

        studentID: "12345",
        courseID: "12",
        instructorID: "12",
    },
    {
        course: 'Kjøretime (A1)',
        startTime: "2021-09-15T03:00:00",
        endTime: "2021-09-15T04:30:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: "",

        student:"Jonson Jones",

        studentID: "12346",
        courseID: "123",
        instructorID: "123",
    },
    {
        course: 'Traffikalt grunnkurs',
        startTime: "2021-09-16T03:00:00",
        endTime: "2021-09-16T04:30:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: undefined,

        instructor: "Jonson Jones",
        comment: "",

        student:"Jonson Jones",

        studentID: "1234",
        courseID: "12345",
        instructorID: "1234",
    },
    {
        course: 'Traffikalt grunnkurs',
        startTime: "2021-09-13T04:45:00",
        endTime: "2021-09-13T06:30:00",

        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen',

        amount: 1,
        price: 1000,
        paid: true,

        instructor: "Jonson Jones",
        comment: "",
        
        student:"Jonson Jones",
        
        studentID: "1234",
        courseID: "12345",
        instructorID: "12345",
    }]
}, 1000)

export {
    achievements,
    allCourses,
    previousCourses,
    commingCourses,
    allInstructors,
    allPlaces,
    chatMessages
}