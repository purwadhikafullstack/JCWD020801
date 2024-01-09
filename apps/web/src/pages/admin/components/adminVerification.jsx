import { Button, Input, Tooltip, Typography } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helper } from "./icons";
import { SuccessDialog } from "./dialogs";

export default function AdminVerification() {
  const params = useParams();
  const [verCode, setVerCode] = useState();
  const [same, setSame] = useState(false);
  const [inputVerCode, setInputVerCode] = useState('');
  const [openSDialog, setOpenSDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleOpenSdialog = () => setOpenSDialog(!openSDialog);

  const handleVerification = async () => {
    try {
      await axios.patch('admins/verification', null,
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
    } catch (err) {
      setErrorMessage(err.response.data.message)
    }
  };

  const getVerCode = async () => {
    try {
      const response = await axios.get('admins/vercode', {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      setVerCode(response.data.result);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (data) => {
    try {
      const response = await axios.patch('admins/password', data, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      })
      handleOpenSdialog();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(3, "Must be at least 3 characters long").required("Password can't be empty"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match the confirmation password") // Validasi konfirmasi password
      .required("Confirm password cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: PasswordSchema,
    onSubmit: (values, action) => {
      handleSubmit(values)
      action.resetForm();
    }
  })

  useEffect(() => {
    handleVerification();
    getVerCode();
  }, [])

  const handleVerCode = () => {
    if (inputVerCode === verCode?.verification_code) {
      toast.success("Create your password")
      setSame(true)
    } else {
      toast.error("Wrong verification code. Please contact your super admin to get your verification code.")
    }
  }

  const handleInput = (e) => {
    setInputVerCode(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center gap-5 bg-[#edf7f4]">
        <div className="flex flex-col items-center justify-center border-2 md:mt-52 p-14 rounded-2xl shadow-md bg-white">
          <div className="flex flex-col items-center justify-center gap-2 p-11">
            {verCode?.verification_code && verCode?.password == null ?
              <>
                <Typography className="text-[#41907a]" variant="h2">Email Verified</Typography>
                <Typography className="text-[#41907a]">Your email is now verified.</Typography>
                {same === false ?
                  <>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Typography>Input verification code to create your password</Typography>
                      <Helper content={'Contact your super admin to get your verification code'} />
                    </div>
                    <Input label="Verification Code" onChange={(e) => handleInput(e)}></Input>
                    <Button onClick={handleVerCode} color="green" className="rounded-md" variant="outlined" fullWidth>Enter</Button>
                  </>
                  :
                  <>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="flex flex-col items-center justify-center gap-3 p-3">
                        <Typography className="text-[#41907a]">Create your password</Typography>
                        <Input
                          name="password"
                          label="New Password"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className=" text-red-900 text-xs">
                            {formik.errors.password}
                          </div>
                        ) : null}
                        <Input
                          name="confirmPassword"
                          label="Confirm password"
                          onChange={formik.handleChange}
                          type="password"
                          value={formik.values.confirmPassword}
                          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                          <div className=" text-red-900 text-xs">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex w-full">
                        <Button type="submit" color="green" className="rounded-full" variant="outlined" fullWidth>Create</Button>
                      </div>
                    </form>
                  </>}
              </>
              :
              <div className="flex flex-col gap-5 items-center justify-center">
                <Typography className="text-[#41907a]" variant="h2">{errorMessage}</Typography>
                <Link to={'/login-admin'}>
                  <Button color="green" variant="outlined">Login</Button>
                </Link>
              </div>}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
        className={'rounded-lg'}
        style={{ zIndex: 10001 }}
      />
      <SuccessDialog
        openSDialog={openSDialog}
        handleOpenSDialog={handleOpenSdialog}
        content={'You can now login with your new password'}
        action='login'
      />
    </>
  )
}