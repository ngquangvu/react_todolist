<?php

namespace App\Http\Controllers\API;

use App\Enums\TodoPriorityEnum;
use App\Enums\TodoStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\Sanctum;
use stdClass;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function countState()
    {
        $all = Todo::withTrashed()->get()->count();
        $scheduled = Todo::get()->count();
        $onlyTrashed = Todo::onlyTrashed()->get()->count();

        $result = new stdClass();
        $result->all = $all;
        $result->scheduled = $scheduled;
        $result->onlyTrashed = $onlyTrashed;

        return response()->json($result);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        if ($request->has('per_page') && $request->per_page == true) {
            $todos = $user->todos()->paginate($request->per_page);
        } else {
            $todos = $user->todos()->paginate(10);
        }

        return TodoResource::collection($todos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'string|max:500',
            'due_date' => 'required|date',
            'status' => [
                'required',
                Rule::in(TodoStatusEnum::class),
            ],
            'priority' => [
                'required',
                Rule::in(TodoPriorityEnum::class),
            ],
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $todo = new Todo();
        $todo->title = $request->title;
        $todo->content = $request->content;
        $todo->due_date = $request->due_date;
        $todo->status = $request->status;
        $todo->priority = $request->priority;
        $todo->created_by = auth()->user()->id;
        $todo->created_at = date('Y-m-d H:i:s');
        $todo->updated_at = date('Y-m-d H:i:s');
        $todo->save();

        return new TodoResource($todo);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $todo = Todo::findOrFail($id);
        if (is_null($todo)) {
            abort(500);
        }
        if (auth()->user()->id != $todo->created_by) {
            abort(403);
        }
        return new TodoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        if (is_null($todo)) {
            abort(500);
        }
        if (auth()->user()->id != $todo->created_by) {
            abort(403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'string|max:500',
            'due_date' => 'required|date',
            'status' => [
                'required',
                Rule::in(['N/A', 'New', 'In-progress', 'Pending', 'Canceled', 'Complete']),
            ],
            'priority' => [
                'required',
                Rule::in(['High', 'Medium', 'Low']),
            ],
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $todo->title = $request->title;
        $todo->content = $request->content;
        $todo->due_date = $request->due_date;
        $todo->status = $request->status;
        $todo->priority = $request->priority;
        $todo->updated_at = date('Y-m-d H:i:s');

        $todo->save();
        return new TodoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return new TodoResource($todo);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $todo = Todo::where('id', $id)->onlyTrashed()->firstOrFail();
        if (is_null($todo)) {
            abort(500);
        }
        if (auth()->user()->id != $todo->created_by) {
            abort(403);
        }

        $todo->restore();
        return new TodoResource($todo);
    }
}
