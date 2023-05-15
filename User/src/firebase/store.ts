import { ref, watch } from "vue";
import moment from "moment";
import { onSnapshot, collection, doc, getDocs, query, where, orderBy } from "firebase/firestore";
import { confirmPasswordReset, onAuthStateChanged,  } from "firebase/auth";

import { db, auth } from "./firebase";

const userRef = ref("");

/* All places */
interface PlaceProps {
    fullAddress: string,
    name: string,
    placeId: string,
}
const allPlaces = ref<PlaceProps[]>([])

const allPlaceDocs = getDocs(collection(db, "places"))

allPlaceDocs.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        allPlaces.value.push({
            fullAddress: doc.data().fullAddress,
            name: doc.data().name,
            placeId: doc.id,
        })
    })
})

/* All course templates */
interface courseTemplateProps {
    name: string,
    templateId: string,
    price: number,
    license: string,
    DurationMinutes: number,
}

const allCourseTemplates = ref<courseTemplateProps[]>([])

const allCourseTemplateDocs = getDocs(collection(db, "courseTemplates"))

allCourseTemplateDocs.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        allCourseTemplates.value.push({
            name: doc.data().name,
            templateId: doc.id,
            price: doc.data().price,
            license: doc.data().license,
            DurationMinutes: doc.data().DurationMinutes,
        })
    })
})

/* All instructors */
interface instructorProps {
    name: string,
    instructorId: string,
}

const allInstructors = ref<instructorProps[]>([])

const allInstructorDocs = getDocs(collection(db, "instructors"))

allInstructorDocs.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        allInstructors.value.push({
            name: doc.data().name,
            instructorId: doc.id,
        })
    })
})

interface UserProps {
    userId: string,
    name: string,
    drivetime: string,
    license: string,
    mainInstructor: string,
}

const user = ref<UserProps>({
    userId: "",
    name: "",
    drivetime: "0",
    license: "",
    mainInstructor: "",
})

const extraData = ref({
    payedSum: 0,
    unpaidSum: 0,
})

const achievementFetch = ref(false)

async function getUserData() {
    const userDoc = doc(db, "users", userRef.value)

    onSnapshot(userDoc, (doc) => {
        user.value.userId = doc.id
        user.value.name = doc.data()?.name
        user.value.drivetime = doc.data()?.drivetime
        user.value.license = doc.data()?.license
        user.value.mainInstructor = doc.data()?.mainInstructor

        if(achievementFetch) {
            getAchievements()
            feachCourses()
            getChatsAndChatMesseges()
            achievementFetch.value = true
        }
    })
}

/* all achievements and time driven */
interface achievements {
    name: string,
    done: boolean,
    id: string,
}

const achievements = ref<achievements[]>([])

const AchievementsRef = collection(db, "achievementTemplates")

async function getAchievements() {
    const achievementKey = user.value.license

    const achievementsDoc = query(collection(db, "achievements"), where("userId", "==", userRef.value))
    const licenseAchievements = await getDocs(collection(AchievementsRef, achievementKey, "achievements"))
    const globalAchievements = await getDocs(collection(db, "achievementTemplates", "Global", "achievements"))

    let allAchievements:any[] = []

    function addTheRest() {
        licenseAchievements.forEach((licenseDoc) => {
            let alreadyDone = false

            allAchievements.forEach((achievement:any) => {
                if (licenseDoc.id == achievement.id) {
                    alreadyDone = true
                }
            })

            if (alreadyDone) {
                return
            } else {
                const achievementData = {
                    name: licenseDoc.data().name,
                    done: false, // Set "done" as false for remaining achievements
                    id: licenseDoc.id,
                };

                allAchievements.push(achievementData);
            }
          });
      
          globalAchievements.forEach((globalDoc) => {
            let alreadyDone = false

            allAchievements.forEach((achievement:any) => {
                if (globalDoc.id == achievement.id) {
                    alreadyDone = true
                }
            })

            if (alreadyDone) {
                return
            } else {
                const achievementData = {
                    name: globalDoc.data().name,
                    done: false, // Set "done" as false for remaining achievements
                    id: globalDoc.id,
                };
                
                allAchievements.push(achievementData);
            }
        });

        achievements.value = allAchievements
    }


    onSnapshot(achievementsDoc, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            licenseAchievements.forEach((licenseDoc) => {
                if (doc.data().achievementId == licenseDoc.id) {
                    const achievementData = {
                      name: licenseDoc.data().name,
                      done: true,
                      id: licenseDoc.id,
                    };
                    allAchievements.push(achievementData);
                }          
            })
            globalAchievements.forEach((globalDoc) => {
                if (doc.data().achievementId == globalDoc.id) {
                    const achievementData = {
                      name: globalDoc.data().name,
                      done: true,
                      id: globalDoc.id,
                    };
                    allAchievements.push(achievementData);
                }
            })
        })

        addTheRest()
    })
}


/* all courses combined & sorter for previus courses and comming courses */
interface CourseProps {
    courseTemplateId: string,
    instructorId: string,
    placeId: string,

    startTime: string,
    endTime: string,
    amount: number,

    price: number,
    paid: boolean,

    comment: string,
}

const allCourses= ref<CourseProps[]>([])

const previousCourses = ref<CourseProps[]>([])

const commingCourses = ref<CourseProps[]>([])

function feachCourses() {
    const coursesRef = collection(db, "courses")

    const q = query(coursesRef, where("userId", "==", userRef.value))

    const querySnapshot = getDocs(q)

    querySnapshot.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            allCourses.value.push({
                courseTemplateId: doc.data().courseTemplateId,
                instructorId: doc.data().instructorId,
                placeId: doc.data().placeId,

                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                amount: doc.data().amount,

                price: doc.data().price,
                paid: doc.data().paid,

                comment: doc.data().comment,
            })
        })

        sortCourses()
    })
}

function sortCourses() {
    allCourses.value.forEach((course) => {

        const today = moment(course.startTime).isBefore()

        if (today) {
            previousCourses.value.push(course)
            extraData.value.payedSum += course.price
        } else {
            commingCourses.value.push(course)
            extraData.value.unpaidSum += course.price
        }
    })
}

/* All Chat Reladted */
const chatCollectionRef = collection(db, "chats")
const msgCollectionRef = collection(db, 'chatMessages')

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

function getChatsAndChatMesseges() {
    const chatCollectionQuery = query(chatCollectionRef, where("userId", "==", userRef.value))

    onSnapshot(chatCollectionQuery,(querySnapshot:any) => {
        querySnapshot.docs.forEach((doc:any) =>{
            chats.value.push({
                id: doc.id,
                chatName: doc.data().instructor,
                instructorId: doc.data().instructorId,
                studentId: doc.data().userId,
            })
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
}

onAuthStateChanged(auth,async (user) => {
    if (user) {
        userRef.value = user.uid

        getUserData()
    } else {
        console.log("no user")
    }
})

export {
    allPlaces,
    allCourseTemplates,
    allInstructors,

    achievements,
    previousCourses,
    commingCourses,
    
    allCourses,

    chats,
    chatMessages,
    userRef,
    msgCollectionRef,

    extraData,
    user,
}

export type {
    CourseProps
}