import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { COURS_API } from "../../enpoints";


export const coursApi = createApi({
    reducerPath: "coursApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["CoursPartenaires"],
    endpoints: (builder) => ({
        // ... dans ton coursApi.js
getCoursPartenaires: builder.query({
    query: () => `${COURS_API}courses/`,
    providesTags: (result) =>
        result
            ? [
                ...result.results.map(({ id }) => ({ type: 'CoursPartenaires', id })),
                { type: 'CoursPartenaires', id: 'LIST' },
              ]
            : [{ type: 'CoursPartenaires', id: 'LIST' }],
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