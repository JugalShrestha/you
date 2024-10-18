import { useState } from "react"
import { auth,db, storage} from "../../firebase"
import { setDoc, doc, deleteDoc, Timestamp } from "firebase/firestore"
import {ref, uploadBytes, deleteObject, getDownloadURL, listAll} from 'firebase/storage'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, deleteUser, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../useAppContext"

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signUp, setSignUp] = useState(false)
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [contact, setContact] = useState("")
    const [work, setWork] = useState([]) 
    const [newWork, setNewWork] = useState("")  // Temp state for a new work entry
    const [image,setImage] = useState(null)
    const {isLoggedIn, setIsLoggedIn, userData} = useAppContext();
    
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePwChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("logged In!");
            setIsLoggedIn(true);
            navigate("/");
        } catch (e) {
            alert(e.message);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            let imageUrl = "";
            

            // Handle image upload
            if (image) {
                const storageRef = ref(storage, `profile_photo/${user.uid}/${image.name}`); // Create a reference
                await uploadBytes(storageRef, image); // Upload image
                imageUrl = await getDownloadURL(storageRef); // Get the download URL
            }
            const userData = {
                email: email,
                name: name,
                bio: bio,
                contact: contact,
                works: work,
                profileImage: imageUrl,
                joined: Timestamp.now(),
            };
            //Adding data to firestore
            await setDoc(doc(db,"you_sers",user.uid),userData);

            alert("Logged In!");
            setIsLoggedIn(true);
            navigate("/");
        } catch (e) {
            alert(e.message);
        }
    };

    const handleLogOut = async() =>{
        try{
            await signOut(auth);
            setIsLoggedIn(false);
            alert("logged Out!");
        }
        catch(e){alert(e.message)}
    }

    const handleAddWork = () => {
        if (newWork.trim() !== "") {
            setWork([...work, newWork]) // Add new work to the work array
            setNewWork("") // Clear input after adding
        }
    }

    const handleDeleteWork = () => {
        setWork([]);
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Set the selected image file
        }
    };

    const goToProfile = () =>{
        navigate(`/detail/${userData.uid}`,{ state : {item: userData}  })
        console.log(userData.uid);
    }

    const handleDeleteAccount = async() => {
        const userDocRef = doc(db,"you_sers",userData.uid);
        try{
            await deleteDoc(userDocRef);
            if(userData.profileImage){
                const folderRef = ref(storage,`profile_photo/${userData.uid}`);
                const listResult =  await listAll(folderRef);
                const deletePromises = listResult.items.map((itemRef)=>{
                    return deleteObject(itemRef);   
                })
                await Promise.all(deletePromises);
            }
            await deleteUser(auth.currentUser);
            handleLogOut();
            alert("Data deleted!");
            navigate('/');
        }
        catch(e){
            alert(e.message);
        }
    }

    return (
        <>
        {
            isLoggedIn && userData?
            <>
            <div className="login-page">
                <div onClick={goToProfile} className="profile-card">
                    <div className="rank">#{userData.rank}</div>
                    <div className="name">{userData.name}</div>
                    <div className="photo">
                        <img src={userData.profileImage? userData.profileImage: "/logo.png"}/>
                    </div>
                </div>
                <div onClick={handleDeleteAccount} className="delete-btn">
                    Delete Account
                </div>
                <div onClick={handleLogOut} className="logout-btn">
                    Logout
                </div>
            </div>
            </>
            :
            <>
            <div className="login-page">
            <div className="header">{signUp ? "SignUp" : "Login"}</div>
            <form onSubmit={signUp ? handleSignUp : handleLogin} className="credentials">
                <div className="credential">
                    <div className="text">Email</div>
                    <input required onChange={handleEmailChange} value={email} type="email" placeholder="Enter your email here!" />
                </div>
                <div className="credential">
                    <div className="text">Password</div>
                    <input required onChange={handlePwChange} value={password} type="password" placeholder="Enter your Password here!" />
                </div>
                {signUp &&
                    <>
                        <div className="credential">
                            <div className="text">Name</div>
                            <input required value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Name here!" />
                        </div>
                        <div className="credential">
                            <div className="text">Contact</div>
                            <input value={contact} onChange={(e) => { setContact(e.target.value) }} type="text" placeholder="Contact Here!" />
                        </div>
                        <div className="credential">
                            <div className="text">Bio</div>
                            <textarea value={bio} onChange={(e) => { setBio(e.target.value) }} placeholder="Bio here!" />
                        </div>

                        {/* Dynamic Work Entry */}
                        <div className="credential">
                            <div className="text">work</div>
                            <input
                                value={newWork}
                                onChange={(e) => setNewWork(e.target.value)}
                                type="url"
                            />
                            <button className="add-work" type="button" onClick={handleAddWork}>Save work link</button> {/* Add work button */}
                        </div>

                        {/* Image Upload */}
                        <div className="credential">
                            <div className="text">Profile Picture</div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Display list of works */}
                        {work.length > 0 && (
                                <>{work.map((item, index) => (
                                    <div className="added-work" key={index}>
                                        {index + ". " +item}
                                    </div>
                                ))}
                                <button className="add-work" type="button" onClick={handleDeleteWork}>Delete Works</button>
                                </>
                        )}
                    </>
                }
                <button className="login-btn" type="submit">{signUp ? "SignUp" : "Login"}</button>
                <div className="sign-up" onClick={() => { setSignUp(!signUp) }}>
                    {signUp ? "Have an account? Login!" : "Do not have an account? SignUp!"}
                </div>
            </form>
            </div>
            </>
        }
        
        </>
    )
}

export default LoginPage;
