import { ref, watch } from "vue";
import { db } from "./firebase";
import moment from "moment";
import { collection, getDocs, doc, onSnapshot, getDoc, where, query, orderBy } from "firebase/firestore"; 

const instructorRef = "PLEAK8uurOasSrtnXhlH"

/* Firebase snapshots */
const InstructorsSnapshot = await getDocs(collection(db, "instructors"))
const PlacesSnapshot = await getDocs(collection(db, "places"))
const CourseTypeSnapshot = await getDocs(collection(db, "courseTemplates"))

interface instructorsProps {
    name: string,
    instructorId: string,
}

interface placesProps {
    placeId: string,
    name: string,
    fullAddress: string,
}

interface courseTypesProps {
    name: string,
    price: number,
    courseTypeID: string
    DurationMinutes: number
}

const previousCourses = ref<[] | any>([])/* Courses befor current date */
const commingCourses = ref<[] | any>([])/* Courses after current date */


/* All instructors with name and ID */
const allInstructors = ref<instructorsProps[]>([])

/* All places with address and name */
const allPlaces = ref<placesProps[]>([])

/* All course types */
const allCourseTypes = ref<courseTypesProps[]>([])




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
        placeId: doc.id,
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

/* All achievements */
const AchievementsRef = collection(db, "achievementTemplates")
interface achievementProps {
    achievementId: string,
    name: string,
}

const allAchievements = ref<{
    [key: string]: achievementProps[]
}>({
    "A1": [],
    "A_A2": [],
    "B": [],
    "Global": [],
})

for (const key in allAchievements.value) {
    const querySnapshot = await getDocs(collection(AchievementsRef, key, "achievements"))
    const docs = querySnapshot.docs

    docs.map((doc) => {
        allAchievements.value[key].push({
            achievementId: doc.id,
            name: doc.data().name,
        })
    })
}




/* Instrucotrs users */
interface instructorUsers {
    userId: string;
    name: string;
    license: string;
    nextCourse?: string;
}

const instructorsUsers = ref<instructorUsers[]>([])

const usersCollectionRef = collection(db, "users")
const usersQuery = query(usersCollectionRef, where("mainInstructor", "==", instructorRef))

onSnapshot(usersQuery, (students:any) => {
    instructorsUsers.value = []

    students.forEach(async (student:any) => {
        instructorsUsers.value.push({
            userId: student.id,
            name: student.data().name,
            license: student.data().license,
        })
    })
})

/* All Chat Reladted */
const chatCollectionRef = collection(db, "chats")
const msgCollectionRef = collection(db, 'chatMessages')

const chatCollectionQuery = query(chatCollectionRef, where("instructorId", "==", instructorRef))
interface Chat {
    id: string;
    chatName: string;
    instructorId: string;
    studentId: string;
}

interface Message {
    text: string;
    datetime: string;
    from: string;
}

interface ChatMessages {
    chatId: string;
    messages: Message[]
}

const chats = ref<Chat[]>([])

const chatMessages = ref<any>()

onSnapshot(chatCollectionQuery,(querySnapshot:any) => {
    chats.value = querySnapshot.docs.map((doc:any) =>{
        if(doc.instructorChat === true){
            if(doc.data().instructorId === instructorRef){
                return {
                    id: doc.id,
                    chatName: doc.data().user,
                    instructorId: doc.data().userId,
                }
            } else {
                return {
                    id: doc.id,
                    chatName: doc.data().instructor,
                    instructorId: doc.data().instructorId,
                }
            }
        } else {
            return {
                id: doc.id,
                chatName: doc.data().user,
                instructorId: doc.data().userId,
            }
        }     
    })
    const messagesQuery = query(msgCollectionRef, where('chatId', 'in', chats.value.map((chat:any) => chat.id)), orderBy('timestamp', 'desc'))

    onSnapshot(messagesQuery, (messagesSnapShot:any) => {
        const chatMap: Record<string, ChatMessages> = {};

        messagesSnapShot.docs.forEach((doc:any) => {
            const chatId = doc.data().chatId

            const message = {
                text: doc.data().text,
                datetime: doc.data().datetime,
                from: doc.data().from,
            }

            if (!(chatId in chatMap)) {
                chatMap[chatId] = { chatId, messages: [message] };
            } else {
                chatMap[chatId].messages.push(message);
            }
        })

        chatMessages.value = chatMap;
    })
})



/* Exporsts */
export {
    previousCourses,
    commingCourses,
    allInstructors,
    allPlaces,
    allCourseTypes,
    allAchievements,

    chats,
    chatMessages,
    msgCollectionRef,
    instructorsUsers,
    
    /* For testing, simulates login user */
    instructorRef,
}

/* Just for dev */
/* setTimeout(() => 
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
    }
]}, 1000) */