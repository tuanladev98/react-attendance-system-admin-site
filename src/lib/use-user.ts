import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";

const teacherFetcher = () =>
  axios
    .get(`${ATTENDANCE_API_DOMAIN}/admin/get-info`, {
      headers: {
        authorization: `Bearer ${Cookies.get("admin_access_token")}`,
      },
    })
    .then((response) => response.data);

export default function useUser() {
  const { data, mutate, error } = useSWR("/api/admin/get-info", teacherFetcher);

  const isLoading = !data && !error;

  return {
    isLoading,
    error,
    admin: data,
    mutate,
  };
}
