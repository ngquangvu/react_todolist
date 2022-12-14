@extends('layout.html')

@section('meta')
<x-shared.meta title="change value like this!">
    {{--
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> --}}
</x-shared.meta>
@endsection

@section('content')
<div class="min-h-full">
    <div class="py-10">
        <header>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
            </div>
        </header>
        <main>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-8 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-md h-96"></div>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</div>
@endsection
