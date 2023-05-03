import { ref, watch } from "vue";
import { db } from "./firebase";
import moment from "moment";
import { collection, getDocs, doc } from "firebase/firestore"; 

/* Firebase snapshots */
const InstructorsSnapshot = await getDocs(collection(db, "instructors"))
const PlacesSnapshot = await getDocs(collection(db, "places"))
const CourseTypeSnapshot = await getDocs(collection(db, "courseTemplates"))

const AchievementsGlobalSnapshot = await getDocs(collection(db, "achievementTemplates/Global/achievements"))

AchievementsGlobalSnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});
/* Interfaces */
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
    courseTypeID: string
}

interface instructorsProps {
    name: string,
    instructorId: string,
}

interface placesProps {
    name: string,
    fullAddress: string,
}

interface courseTypesProps {
    name: string,
    price: number,
    courseTypeID: string
    DurationMinutes: number
}

interface chatMessages {
    instructorID: string;
    messages: {
        from: string;
        message: string;
        datetime: string;
    }[]
}


/* all courses combined & sorter for previus courses and comming courses */
const allCourses= ref<CourseProps[]>([])

const previousCourses = ref<[] | any>([])/* Courses befor current date */
const commingCourses = ref<[] | any>([])/* Courses after current date */


/* All instructors with name and ID */
const allInstructors = ref<instructorsProps[]>([])

/* All places with address and name */
const allPlaces = ref<placesProps[]>([])

/* All course types */
const allCourseTypes = ref<courseTypesProps[]>([])

/* All achievements */
const allAchievements = ref<[] | any>([
    {
        global: [
            "Kjøring i mørket",
        ]
    }
])


/* Chats and chats messages */
const chatMessages = ref<chatMessages[]>([
    {
        instructorID: "1",
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
        instructorID: "12",
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
        instructorID: "123",
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

/* Sorter allcourses into previous and comming*/
watch(allCourses, (item) => {
    const now = moment().format()

    item.forEach((course:any) => {
        let test = moment(course.date).isAfter(now)
        if (test) {
            commingCourses.value.push(course)
        } else {
            course.paid = false
            previousCourses.value.push(course)
        }
    })
})


/* Exporsts */
export {
    allCourses,
    previousCourses,
    commingCourses,
    allInstructors,
    allPlaces,
    allCourseTypes,
    chatMessages
}

/* Just for dev */
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
        instructorID: "MtOxJEmrKzgMTLxf3hgw",
        courseTypeID: "4",
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
        courseTypeID: "4",
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
        courseTypeID: "4",
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
        courseTypeID: "4",
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
        courseTypeID: "4",
    }]
}, 1000)

/* Foreach loop through firebase snapshots*/
InstructorsSnapshot.forEach((doc) => {
    allInstructors.value?.push({

        name: doc.data().name,
        instructorId: doc.id
    })
})

PlacesSnapshot.forEach((doc) => {
    allPlaces.value?.push({
        name: doc.data().name,
        fullAddress: doc.data().fullAddress,
    })
})

CourseTypeSnapshot.forEach((doc) => {
    allCourseTypes.value?.push({
        name: doc.data().name,
        DurationMinutes: doc.data().DurationMinutes,
        price: doc.data().price,
        courseTypeID: doc.id
    })
})