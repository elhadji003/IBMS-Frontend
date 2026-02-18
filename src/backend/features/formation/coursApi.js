import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { COURS_API } from "../../enpoints";


export const coursApi = createApi({
    reducerPath: "coursApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["CoursPartenaires"],
    endpoints: (builder) => ({
        getCoursPartenaires: builder.query({
            query: () => ({
                url: `${COURS_API}courses/`,
                method: "GET",
            }),
            providesTags: ["CoursPartenaires"],
        }),
        getCoursById: builder.query({
            query: (id) => ({
                url: `${COURS_API}courses/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "CoursPartenaires", id }],
        }),
    }),
})

export const { useGetCoursPartenairesQuery, useGetCoursByIdQuery } = coursApi;