import { ref, watch } from "vue";
import { db } from "./firebase";
import moment from "moment";
import { collection, getDocs, doc, onSnapshot, getDoc, where, query } from "firebase/firestore"; 

const instructorRef = "PLEAK8uurOasSrtnXhlH"

/* Firebase snapshots */
const InstructorsSnapshot = await getDocs(collection(db, "instructors"))
const PlacesSnapshot = await getDocs(collection(db, "places"))
const CourseTypeSnapshot = await getDocs(collection(db, "courseTemplates"))
const AchievementsSnapshot = await getDocs(collection(db, "achievementTemplates"))
const AchievementsGlobalSnapshot = await getDocs(collection(db, "achievementTemplates/Global/achievements"))

/* firebase ref */
const chatCollectionRef = collection(db, "chats");
const chatCollectionQuery = query(chatCollectionRef, where("instructorId", "==", instructorRef))

const usersCollectionRef = collection(db, "instructors", instructorRef, "students")


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
    chatId: string;
    messages: {
        from: string;
        message: string;
        datetime: string;
    }[]
}

interface instructorUsers {
    userId: string;
    name: string;
    license: string;
    nextCourse?: string;
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
const allAchievements = ref<[] | any>({
    global: [],
    A1: [],
    A_A2: [],
    B: []
})

const instructorsUsers = ref<instructorUsers[]>([])


/* Chats and chats messages */
const chatMessages = ref<chatMessages[]>([])

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
    allAchievements,
    chatMessages,
    instructorsUsers,
    
    /* For testing, simulates login user */
    instructorRef,
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
    if(doc.id === instructorRef){
        return
    } else {
        allInstructors.value?.push({

            name: doc.data().name,
            instructorId: doc.id
        })
    }
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

AchievementsGlobalSnapshot.forEach((doc) => {
    allAchievements.value.global.push(doc.data().name)
})

AchievementsSnapshot.forEach((doc) => {
    if (!doc.data().A1) return
    const A1:[] = doc.data().A1
    const A_A2:[] = doc.data().A_A2
    const B:[] = doc.data().B

    A1.forEach((name:any) => {
        allAchievements.value.A1.push(name)
    })

    A_A2.forEach((name:any) => {
        allAchievements.value.A_A2.push(name)
    })

    B.forEach((name:any) => {
        allAchievements.value.B.push(name)
    })

})

onSnapshot(usersCollectionRef, (students:any) => {
    students.forEach(async (student:any) => {
        const userRef = doc(db, "users", student.data().userId)
        const userSnap = await getDoc(userRef)

        instructorsUsers.value.push({
            userId: userSnap.id,
            name: userSnap.data()?.name,
            license: userSnap.data()?.license,
        })
    })
})

onSnapshot(chatCollectionQuery,(querySnapshots:any) => {
    console.log('100 chatCollectionQuery started')

    querySnapshots.forEach((doc:any) => {
        console.log('200 chatCollectionQuery top forEach snapshot started')

        const chatRef = `${doc.data().userId}_${doc.data().instructorId}`
        const msgCollectionRef = collection(db, `chats/${chatRef}/msg`)

        let chatPush:chatMessages = {
            chatId: chatRef,
            messages: []
        }

        onSnapshot(msgCollectionRef, (msgSnap:any) => {
            console.log('300 chat massegs snapshot')
            msgSnap.forEach((doc:any) => {
                console.log('400 chat massegs foreach')
                chatPush.messages.push({
                    message: doc.data().text,
                    datetime: doc.data().datetime,
                    from : doc.data().from,
                })

                
            })
        })        
        chatMessages.value.push(chatPush)
    })
})

