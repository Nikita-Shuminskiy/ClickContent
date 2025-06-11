import {useInitAuthMarket} from "@/hooks/useInitAuthMarket";
import {useYandexMetrika} from '@/hooks/useYandexMetrica';
import {useYMScript} from '@/contexts/YMProvider/useYmScript';
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user";
import RoutingRoot from "@/routing/routing-root.tsx";
import useAuthListener from "@/hooks/useAuthListener.ts";
import {useGetAvailableBySms} from "@/core/api/api-hooks/auth/use-get-available-by-sms.ts";


function App() {
    useAuthListener()
    useInitAuthMarket();
    useYMScript();
    useYandexMetrika();
    useGetUser();
    useGetAvailableBySms()
/*
    localStorage.setItem('ql_params', JSON.stringify({"type":"quicklink","id":"b0cf8074-e867-47f9-b38e-96bbc78c0542","email":"9580899@gmail.com","paymentId":566671383}) )
    localStorage.setItem('payments', JSON.stringify([{"id":"b0cf8074-e867-47f9-b38e-96bbc78c0542","type":"quicklink","date":"2025-03-17T10:16:42.740Z","email":"9580899@gmail.com","paymentId":566671383}]))
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODUxYzE1LTQxMjEtNDg0ZS1hODhhLWJiYWM4YjFjMjZjZSIsIm5iZiI6MTc0MjE5ODY4OSwiZXhwIjoxNzQyMjg1MDg5LCJpYXQiOjE3NDIxOTg2ODl9.tZsQByQc4yAQ7qz87Vuu7mn1UJhytGXRDSCQ6bX0iPU')*/
    return <RoutingRoot/>
}

export default App;
