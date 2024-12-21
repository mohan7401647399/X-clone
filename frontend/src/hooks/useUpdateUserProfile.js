import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "../constant/url"
import toast from "react-hot-toast"

const useUpdateUserProfile = () => {

    const queryClient = useQueryClient()

    const { mutateAsync : updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (formData) => {
            try {
                const response = await fetch(`${BASE_URL}/api/users/update`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                const data = await response.json()

                if (!response.ok) throw new Error(data.error || 'something went wrong in update profile')
                return data

            } catch (error) {
                console.log(`update profile error message: ${error}`)
                throw error
            }
        },
        onSuccess: () => {
            toast.success("Profile Updated")
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['authUser'] }),
                queryClient.invalidateQueries({ queryKey: ['userProfile'] })
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {updateProfile, isUpdatingProfile}
}

export default useUpdateUserProfile
