import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";

function ListaDatos() {
    const [recordatorio, setRecordatorio] = useState([])
    const leerDatosFirestore = async () => {
        await getDocs(collection(db, "recordatorios"))
            .then((querySnapshot) => {
                const listado = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setRecordatorio(listado);
            })
    }

    useEffect(() => {
        leerDatosFirestore();
    }, [])

    const escribeDatosFirestore = async () => {
        try {
            const docRef = await addDoc(collection(db, "recordatorios"), {
                titulo: document.getElementById("entrada").value,
                descripcion: document.getElementById("salidaxd").value
            });
            console.log("Document written with ID: ", docRef.id);
            leerDatosFirestore();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <>
            <h1>Componente lista Datos</h1>
            <div>
                {
                    recordatorio.map((recordatorio) => {
                        return (
                            <div key={recordatorio.id}>
                                <h2>{recordatorio.titulo}</h2>
                                <p>{recordatorio.descripcion}</p>
                            </div>

                        )
                    })
                }
            </div>
            <div className="botones">
                <input id="entrada" type="text" placeholder="Insertar título" />
                <input id="salidaxd" type="text" placeholder="Insertar título" />
                <button onClick={escribeDatosFirestore}>Añadir</button>
            </div>
        </>
    )
}

export default ListaDatos