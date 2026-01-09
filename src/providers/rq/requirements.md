# Data with caching strategy using React Query

## 1. 개요

리액트 쿼리를 사용하여 데이터 페칭, 추가, 부분/전체 수정 및 삭제를 관리한다.

## 2. Params

학원유저들만 사용할 수 있기 때문에 user 와 비지니스(학원)의 id값을 **bizinfo_id** 로 전달해야 한다.

- fetching 시 bizinfo_id에 맞는 데이터를 가져온다.

## 3. payload

1. POST 에 해당하는 추가 시 Type+Payload 의 타입으로 이루어진 객체를 전달받는다.
2. PUT 은 전면 수정으로 Type+Payload 를 받는다.
3. PATCH 는 부분 수정으로 payload 는 target 과 value 로 나누어 전달 받는다.
4. DELETE 시 payload는 해당 Data의 id다.
